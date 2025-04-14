// 블로그 포스트 상세 조회를 위한 목업 데이터
export const mockPostData = {
    id: 1,
    title: "마이크로서비스 아키텍처: 설계부터 배포까지",
    content: `
  # 마이크로서비스 아키텍처: 설계부터 배포까지
  
  ## 소개
  
  마이크로서비스 아키텍처는 대규모, 복잡한 애플리케이션 개발에 있어 많은 장점을 제공합니다. 이 글에서는 마이크로서비스 설계 원칙, 패턴 및 구현 전략에 대해 심층적으로 알아보겠습니다.
  
  ## 마이크로서비스란?
  
  마이크로서비스는 하나의 큰 애플리케이션을 각각 독립적으로 배포 가능한 작은 서비스들로 분리하는 아키텍처 스타일입니다. 각 서비스는 자체 프로세스에서 실행되며 가벼운 통신 메커니즘(일반적으로 HTTP 기반 API)을 통해 통신합니다.
  
  ### 주요 특징:
  
  - **단일 책임**: 각 서비스가 비즈니스 도메인의 특정 부분을 담당
  - **독립적 배포**: 다른 서비스에 영향 없이 독립적으로 배포 가능
  - **기술 다양성**: 서비스마다 다른 기술 스택 활용 가능
  - **탈중앙화된 데이터 관리**: 각 서비스가 자체 데이터베이스 관리
  
  ## 마이크로서비스 설계 원칙
  
  ### 1. 도메인 주도 설계 (DDD) 적용
  
  마이크로서비스 경계를 정의할 때 비즈니스 도메인과 일치시키는 것이 중요합니다. DDD의 바운디드 컨텍스트 개념은 이상적인 서비스 경계를 식별하는 데 도움이 됩니다.
  
  \`\`\`java
  // 주문 마이크로서비스 내의 도메인 객체 예시
  @Entity
  public class Order {
      @Id
      @GeneratedValue
      private Long id;
      
      private String orderNumber;
      private LocalDateTime orderDate;
      private OrderStatus status;
      
      @ElementCollection
      private List<OrderItem> items;
      
      // 비즈니스 로직
      public void addItem(Product product, int quantity) {
          items.add(new OrderItem(product.getId(), product.getName(), product.getPrice(), quantity));
          // 도메인 이벤트 발행
          DomainEvents.publish(new OrderItemAddedEvent(this, product, quantity));
      }
      
      public BigDecimal calculateTotal() {
          return items.stream()
              .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
              .reduce(BigDecimal.ZERO, BigDecimal::add);
      }
  }
  \`\`\`
  
  ### 2. API 게이트웨이 패턴
  
  API 게이트웨이는 클라이언트와 백엔드 마이크로서비스 사이의 단일 진입점 역할을 합니다. 이는 인증, 로깅, 요청 라우팅 등의 공통 기능을 처리합니다.
  
  \`\`\`yaml
  # Spring Cloud Gateway 구성 예시
  spring:
    cloud:
      gateway:
        routes:
          - id: order-service
            uri: lb://order-service
            predicates:
              - Path=/api/orders/**
            filters:
              - name: CircuitBreaker
                args:
                  name: orderCircuitBreaker
                  fallbackUri: forward:/fallback/orders
              - name: RequestRateLimiter
                args:
                  redis-rate-limiter.replenishRate: 10
                  redis-rate-limiter.burstCapacity: 20
          
          - id: product-service
            uri: lb://product-service
            predicates:
              - Path=/api/products/**
  \`\`\`
  
  ### 3. 이벤트 기반 통신
  
  마이크로서비스 간 통신에서 동기 REST 호출보다 비동기 이벤트 기반 접근 방식이 더 효과적인 경우가 많습니다.
  
  \`\`\`java
  // Kafka를 사용한 이벤트 발행 예시
  @Service
  public class OrderService {
      
      private final KafkaTemplate<String, OrderEvent> kafkaTemplate;
      
      @Transactional
      public Order createOrder(OrderRequest request) {
          // 주문 생성 로직
          Order order = orderRepository.save(
              new Order(request.getCustomerId(), request.getItems())
          );
          
          // 주문 생성 이벤트 발행
          OrderCreatedEvent event = new OrderCreatedEvent(
              order.getId(), 
              order.getCustomerId(),
              order.getItems(),
              order.getTotalAmount()
          );
          
          kafkaTemplate.send("order-events", event);
          return order;
      }
  }
  \`\`\`
  
  \`\`\`java
  // 이벤트 소비자 예시 (인벤토리 서비스)
  @Service
  public class InventoryEventHandler {
      
      private final InventoryService inventoryService;
      
      @KafkaListener(topics = "order-events")
      public void handleOrderCreatedEvent(OrderCreatedEvent event) {
          if (event.getType() == EventType.ORDER_CREATED) {
              // 재고 감소 처리
              event.getItems().forEach(item -> 
                  inventoryService.reduceStock(item.getProductId(), item.getQuantity())
              );
          }
      }
  }
  \`\`\`
  
  ## 서비스 디스커버리 및 로드 밸런싱
  
  마이크로서비스 환경에서 서비스 인스턴스는 동적으로 생성되고 제거될 수 있습니다. 서비스 디스커버리는 이러한 동적 환경에서 클라이언트가 서비스를 찾을 수 있게 해줍니다.
  
  ### Spring Cloud Netflix Eureka 활용 예시
  
  \`\`\`java
  // Eureka 서버 설정
  @SpringBootApplication
  @EnableEurekaServer
  public class ServiceRegistryApplication {
      public static void main(String[] args) {
          SpringApplication.run(ServiceRegistryApplication.class, args);
      }
  }
  \`\`\`
  
  \`\`\`yaml
  # 서비스 클라이언트 설정 (application.yml)
  spring:
    application:
      name: order-service
    
  eureka:
    client:
      serviceUrl:
        defaultZone: http://localhost:8761/eureka/
    instance:
      preferIpAddress: true
  \`\`\`
  
  ## 구성 관리
  
  중앙 집중식 구성 관리는 여러 마이크로서비스와 환경에서 구성을 효율적으로 관리하는 데 도움이 됩니다.
  
  \`\`\`yaml
  # Spring Cloud Config 서버 설정
  spring:
    cloud:
      config:
        server:
          git:
            uri: https://github.com/my-org/config-repo
            searchPaths: '{application}'
            username: hello
            password: world
  \`\`\`
  
  \`\`\`yaml
  # 클라이언트 설정 (bootstrap.yml)
  spring:
    application:
      name: order-service
    cloud:
      config:
        uri: http://config-server:8888
        fail-fast: true
        retry:
          max-attempts: 6
          max-interval: 2000
  \`\`\`
  
  ## 분산 추적 및 모니터링
  
  마이크로서비스 환경에서는 요청이 여러 서비스를 통과할 수 있으므로, 분산 추적 시스템을 사용하여 전체 요청 흐름을 모니터링하는 것이 중요합니다.
  
  \`\`\`java
  // Spring Cloud Sleuth + Zipkin 통합 예시
  @SpringBootApplication
  @EnableZipkinServer
  public class TracingServerApplication {
      public static void main(String[] args) {
          SpringApplication.run(TracingServerApplication.class, args);
      }
  }
  \`\`\`
  
  \`\`\`yaml
  # 클라이언트 설정
  spring:
    sleuth:
      sampler:
        probability: 1.0  # 개발 환경에서는 모든 요청 샘플링
    zipkin:
      baseUrl: http://zipkin-server:9411/
  \`\`\`
  
  ## 배포 전략
  
  마이크로서비스는 컨테이너화되어 Kubernetes와 같은 오케스트레이션 도구에 의해 관리되는 것이 일반적입니다.
  
  \`\`\`yaml
  # Kubernetes 배포 예시 (deployment.yaml)
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: order-service
    labels:
      app: order-service
  spec:
    replicas: 3
    selector:
      matchLabels:
        app: order-service
    template:
      metadata:
        labels:
          app: order-service
      spec:
        containers:
        - name: order-service
          image: my-registry/order-service:1.0.0
          ports:
          - containerPort: 8080
          env:
          - name: SPRING_PROFILES_ACTIVE
            value: "production"
          - name: EUREKA_CLIENT_SERVICEURL_DEFAULTZONE
            value: http://eureka-server:8761/eureka/
          resources:
            limits:
              cpu: "1"
              memory: "1Gi"
            requests:
              cpu: "0.5"
              memory: "512Mi"
          readinessProbe:
            httpGet:
              path: /actuator/health
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /actuator/health
              port: 8080
            initialDelaySeconds: 60
            periodSeconds: 30
  \`\`\`
  
  ## 결론
  
  마이크로서비스 아키텍처는 확장성, 유연성, 독립적 배포와 같은 많은 장점을 제공하지만, 분산 시스템의 복잡성도 함께 가져옵니다. 이 글에서 다룬 패턴과 기술은 이러한 복잡성을 관리하고 마이크로서비스의 이점을 극대화하는 데 도움이 됩니다.
  
  마이크로서비스로의 전환은 점진적으로 이루어져야 하며, 팀의 역량과 조직 문화도 함께 발전해야 합니다. 모놀리식 애플리케이션에서 마이크로서비스로의 전환 경로를 신중하게, 단계적으로 계획하는 것이 성공적인 마이크로서비스 구현의 핵심입니다.
  `,
    excerpt: "복잡한 애플리케이션을 위한 마이크로서비스 아키텍처의 철학, 설계 원칙, 실제 구현 방법을 알아봅니다.",
    coverImage: "https://i.namu.wiki/i/eg_6zDyuZMqWahu7RJ1KLYoIS-jZB0C4KN8Te26MzlvzdC2T-rymgBRqIPB2pCSrpbnZUq-8g3iEu0gyzKUVRNtPg2EZAuNu_osIIvMvVt0G3bsNhl3rfNi-rPFgNIQ_bpsymeIpDuKwwPF2qvXBzgUrcziYGQwrNFDWWWifhQ4.svg",
    date: "2025-04-05T09:00:00Z",
    author: {
      name: "김개발",
      avatar: "https://avatars.githubusercontent.com/u/111568619?v=4",
      bio: "백엔드 개발자 | MSA 전문가 | Spring 생태계 열혈 팬"
    },
    categories: ["아키텍처", "마이크로서비스", "Spring Boot"],
    tags: ["MSA", "도메인 주도 설계", "이벤트 기반 아키텍처", "Spring Cloud", "Kubernetes"],
    readTime: 15,
    viewCount: 3241,
    likeCount: 187,
    relatedPosts: [
      {
        id: 2,
        title: "도메인 주도 설계(DDD)의 핵심 개념",
        excerpt: "복잡한 도메인을 효과적으로 모델링하기 위한 DDD의 핵심 개념과 실무 적용 방법",
        coverImage: "/api/placeholder/400/200",
        date: "2025-03-22T14:30:00Z"
      },
      {
        id: 3,
        title: "Spring Cloud로 구현하는 마이크로서비스",
        excerpt: "Spring Cloud 생태계를 활용한 마이크로서비스 아키텍처 구현 가이드",
        coverImage: "/api/placeholder/400/200",
        date: "2025-03-15T10:15:00Z"
      },
      {
        id: 4,
        title: "이벤트 기반 아키텍처의 장단점과 구현 방법",
        excerpt: "마이크로서비스 환경에서 효과적인 이벤트 기반 통신 구현하기",
        coverImage: "/api/placeholder/400/200",
        date: "2025-02-28T09:45:00Z"
      }
    ],
    comments: [
      {
        id: 1,
        author: {
          name: "이클라우드",
          avatar: "/api/placeholder/40/40"
        },
        content: "정말 유익한 글이네요! MSA 도입을 고려하고 있는데 많은 도움이 됐습니다. 서비스 간 통신에서 이벤트 기반 방식이 항상 좋은 선택인가요? 아니면 특정 상황에서는 동기 통신이 더 적합할 수도 있을까요?",
        date: "2025-04-06T11:23:00Z",
        likes: 12
      },
      {
        id: 2,
        author: {
          name: "김개발",
          avatar: "https://avatars.githubusercontent.com/u/111568619?v=4"
        },
        content: "좋은 질문이에요! 모든 상황에 이벤트 기반 통신이 최선은 아닙니다. 실시간 응답이 필요하거나 트랜잭션 일관성이 중요한 경우는 동기 통신이 더 적합할 수 있어요. 상황에 맞게 선택하는 것이 중요합니다.",
        date: "2025-04-06T13:45:00Z",
        likes: 8,
        isAuthor: true
      },
      {
        id: 3,
        author: {
          name: "박데이터",
          avatar: "/api/placeholder/40/40"
        },
        content: "MSA 환경에서 데이터 일관성 유지 전략에 대한 내용도 추가되면 더 완벽할 것 같아요. SAGA 패턴이나 Outbox 패턴 같은 분산 트랜잭션 관리 방법도 다뤄주세요!",
        date: "2025-04-07T09:12:00Z",
        likes: 15
      }
    ]
  };


  // mockData.js
// 기존 목업 데이터에 유저 데이터 추가

// 사용자 목업 데이터
export const mockUsersData = [
    {
      id: 1,
      name: '김개발',
      email: 'kim@example.com',
      role: 'admin',
      status: 'active',
      joinDate: '2024-01-15',
      lastLogin: '2025-04-12'
    },
    {
      id: 2,
      name: '이클라우드',
      email: 'lee@example.com',
      role: 'author',
      status: 'active',
      joinDate: '2024-02-20',
      lastLogin: '2025-04-10'
    },
    {
      id: 3,
      name: '박데이터',
      email: 'park@example.com',
      role: 'author',
      status: 'active',
      joinDate: '2024-03-05',
      lastLogin: '2025-04-11'
    },
    {
      id: 4,
      name: '최스트림',
      email: 'choi@example.com',
      role: 'user',
      status: 'active',
      joinDate: '2024-03-10',
      lastLogin: '2025-04-09'
    },
    {
      id: 5,
      name: '정API',
      email: 'jung@example.com',
      role: 'user',
      status: 'active',
      joinDate: '2024-03-15',
      lastLogin: '2025-04-08'
    },
    {
      id: 6,
      name: '김스프링',
      email: 'kim.spring@example.com',
      role: 'user',
      status: 'inactive',
      joinDate: '2024-03-20',
      lastLogin: '2025-03-30'
    },
    {
      id: 7,
      name: '이ML',
      email: 'lee.ml@example.com',
      role: 'user',
      status: 'pending',
      joinDate: '2024-03-25',
      lastLogin: null
    },
    {
      id: 8,
      name: '박서버',
      email: 'park.server@example.com',
      role: 'user',
      status: 'active',
      joinDate: '2024-04-01',
      lastLogin: '2025-04-05'
    }
  ];

  // mockData.js에 추가할 analytics 데이터

// 분석 및 통계 목업 데이터
export const analyticsData = {
    // 요약 통계 데이터
    summaryData: {
      visitors: {
        value: 24567,
        change: 12.5,
        isIncreasing: true
      },
      pageViews: {
        value: 87219,
        change: 8.3,
        isIncreasing: true
      },
      avgSessionDuration: {
        value: 248, // 초 단위
        change: 5.7,
        isIncreasing: true
      },
      bounceRate: {
        value: 34.2, // 퍼센트
        change: 2.1,
        isIncreasing: false
      }
    },
    
    // 일간 방문자 데이터
    dailyVisitorsData: [
      { date: '04-01', value: 845 },
      { date: '04-02', value: 832 },
      { date: '04-03', value: 901 },
      { date: '04-04', value: 934 },
      { date: '04-05', value: 1290 },
      { date: '04-06', value: 1330 },
      { date: '04-07', value: 1320 },
      { date: '04-08', value: 954 },
      { date: '04-09', value: 925 },
      { date: '04-10', value: 912 },
      { date: '04-11', value: 932 },
      { date: '04-12', value: 1021 },
      { date: '04-13', value: 1130 }
    ],
    
    // 방문 시간대 데이터
    hourlyData: [
      { hour: '00-01', value: 2.1 },
      { hour: '02-03', value: 1.3 },
      { hour: '04-05', value: 0.9 },
      { hour: '06-07', value: 1.5 },
      { hour: '08-09', value: 5.2 },
      { hour: '10-11', value: 9.8 },
      { hour: '12-13', value: 8.7 },
      { hour: '14-15', value: 10.3 },
      { hour: '16-17', value: 12.5 },
      { hour: '18-19', value: 15.2 },
      { hour: '20-21', value: 18.7 },
      { hour: '22-23', value: 13.8 }
    ],
    
    // 트래픽 소스 데이터
    trafficSourceData: [
      { source: 'Google', value: 45.8 },
      { source: 'Direct', value: 25.2 },
      { source: 'Social', value: 15.7 },
      { source: 'Referral', value: 8.3 },
      { source: 'Email', value: 5.0 }
    ],
    
    // 기기 분포 데이터
    deviceData: [
      { device: 'Desktop', value: 58.4 },
      { device: 'Mobile', value: 36.7 },
      { device: 'Tablet', value: 4.9 }
    ],
    
    // 지역 분포 데이터
    regionData: [
      { region: '대한민국', value: 65.3 },
      { region: '미국', value: 12.1 },
      { region: '일본', value: 5.8 },
      { region: '중국', value: 4.2 },
      { region: '기타', value: 12.6 }
    ],
    
    // 인기 게시물 데이터
    popularPosts: [
      { id: 1, title: '마이크로서비스 아키텍처: 설계부터 배포까지', views: 4892, uniqueVisitors: 3241, avgTimeOnPage: 420, bounceRate: 23 },
      { id: 2, title: 'PostgreSQL 성능 최적화: 인덱스 전략과 쿼리 튜닝', views: 3254, uniqueVisitors: 2187, avgTimeOnPage: 380, bounceRate: 28 },
      { id: 3, title: 'Docker와 Kubernetes로 구현하는 CI/CD 파이프라인', views: 2987, uniqueVisitors: 1965, avgTimeOnPage: 345, bounceRate: 32 },
      { id: 4, title: '실시간 데이터 처리를 위한 Apache Kafka 활용법', views: 2845, uniqueVisitors: 1832, avgTimeOnPage: 405, bounceRate: 26 },
      { id: 5, title: 'GraphQL API 설계 모범 사례와 성능 최적화', views: 2156, uniqueVisitors: 1498, avgTimeOnPage: 318, bounceRate: 35 }
    ],
    
    // 최근 방문자 데이터
    recentVisitors: [
      { time: '2025-04-13 08:45', page: '마이크로서비스 아키텍처: 설계부터 배포까지', referrer: 'Google', device: 'desktop', country: '대한민국' },
      { time: '2025-04-13 08:42', page: 'PostgreSQL 성능 최적화: 인덱스 전략과 쿼리 튜닝', referrer: 'Direct', device: 'mobile', country: '대한민국' },
      { time: '2025-04-13 08:40', page: 'Docker와 Kubernetes로 구현하는 CI/CD 파이프라인', referrer: 'Twitter', device: 'desktop', country: '미국' },
      { time: '2025-04-13 08:38', page: '실시간 데이터 처리를 위한 Apache Kafka 활용법', referrer: 'Facebook', device: 'mobile', country: '영국' },
      { time: '2025-04-13 08:36', page: 'GraphQL API 설계 모범 사례와 성능 최적화', referrer: 'LinkedIn', device: 'tablet', country: '일본' },
      { time: '2025-04-13 08:35', page: '홈', referrer: 'Google', device: 'desktop', country: '캐나다' },
      { time: '2025-04-13 08:32', page: '홈', referrer: 'Direct', device: 'mobile', country: '대한민국' }
    ]
  };
const CommentForm = ({ value, onChange, onSubmit, replyTo, onCancelReply }) => (
    <div className="mb-6">
      {replyTo && (
        <div className="bg-blue-50 p-2 mb-2 rounded-lg flex justify-between items-center">
          <span className="text-sm text-blue-800">
            <strong>{replyTo.author.name}</strong>님에게 답글 작성 중
          </span>
          <button 
            onClick={onCancelReply}
            className="text-gray-500 hover:text-gray-700"
          >
            취소
          </button>
        </div>
      )}
      <textarea 
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="댓글을 남겨주세요..."
        rows={4}
      />
      <div className="flex justify-end mt-2">
        <button 
          onClick={onSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          댓글 작성
        </button>
      </div>
    </div>
  );
  
  export default CommentForm;
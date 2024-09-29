using CRUD.Dal;
using CRUD.Dto;
using CRUD.Repository.Interfaces;

namespace TaskManagement.Repository.Biz
{
    public class FeedbackBiz : IFeedbackBiz
    {
        private readonly CRUDDalBase _db;
        public FeedbackBiz(CRUDDalBase db)
        {
            _db = db;
        }
        public async Task<Feedback> AddFeedbackAsync(Feedback feedback)
        {
            var feedBack = await _db.Feedbacks.AddAsync(feedback);
            await _db.SaveChangesAsync();
            return feedback;
        }
    }
}

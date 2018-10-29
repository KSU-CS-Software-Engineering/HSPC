using System;
using System.Collections.Generic;
using System.Linq;
using hspc_api.Contracts;
using hspc_api.Data;

namespace hspc_api.Services
{
    public class ArticleService : IArticleService
    {
        private UserDbContext dbContext;

        public ArticleService(UserDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public string getArticles() {
            return "test";
        }


    }
}

import Queue, { DoneCallback, Job } from "bee-queue";

import { Article, ArticleStatus, IArticle } from "@/models/article";

interface ArticleIngestionJobData {
  article: IArticle;
}

interface ArticleIngestionJobCallback {
  article: IArticle;
}

const articleIngestionQueue = new Queue<ArticleIngestionJobData>("articleIngestion", {
  redis: {
    host: "redis",
  },
});

export const ingestArticle = (article: IArticle) => {
  articleIngestionQueue.createJob({
    article,
  }).save();
};

articleIngestionQueue.process(async (job: Job<ArticleIngestionJobData>, done: DoneCallback<ArticleIngestionJobCallback>) => {
  const updatedArticle = await Article.findByIdAndUpdate(job.data.article._id, {
    status: ArticleStatus.READY,
  }, { new: true });

  if (!updatedArticle) {
    return done(new Error("No article exists with supplied article id"));
  }

  return done(null, { article: updatedArticle });
});
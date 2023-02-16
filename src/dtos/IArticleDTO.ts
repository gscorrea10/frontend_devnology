interface IArticleDTO {
  id: string;
  title: string;
  description?: string;
  url: string;
  publishedAt?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default IArticleDTO;

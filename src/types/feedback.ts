export interface Feedback {
  createdAt: number,
  createdBy: string,
  comment: string,
  email: string,
  id: string,
  rating: number,
}

export interface FeedbackRatingsCount {
  1: number,
  2: number,
  3: number,
  4: number,
  5: number,
}

export interface FeedbackComment {
  comment: string,
  createdBy: string,
  id: string,
}

interface FAQ {
  id: number;
  attributes: {
    question: string;
    answer: string;
    objectID: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface FAQTop {
  id: number;
  question: string;
  answer: string;
  objectID: string;
  createdAt: string;
  updatedAt: string;
}

interface FAQAboutAppAndFirstTimeUser extends FAQ {
  tags_name: { name: string }[];
  suggestedTopic: string;
}

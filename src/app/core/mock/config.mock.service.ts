export class ConfigMockService {
    newsApi = {
      apiKey :  '5682c3e724464abcbc6f267ef4ec3389',
      url : 'https://newsapi.org/v2/everything?',
      channels : [
        {
            label: 'LOCAL NEWS',
            value: 'local-news'
        },
        {
            label: 'ABC NEWS',
            value: 'abc-news'
        }
      ]
    }
  
  constructor() { }

  getSourceLabelByValue(value: string): string {
      return '';
  }

}

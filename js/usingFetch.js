import { url } from "./API.js";

export class UsingFetch {
  constructor() {
    this.concepts = [];
    this.response = null
    this.answer = null
    this.related = []
  }
  async fetching() {
    try {
      this.response = await fetch(url);
      this.answer = await this.response.json(); //Transform current json into a js object
      const { body, api_owner } = this.answer; //destructuring
      this.related = body[1].Related;
      this.related.forEach(e => {
        this.concepts.push({
          "word": e.Word,
          "url_wikipedia_definition": e.urls.wikipedia,
          "url_wiktionary_definition": e.urls.wiktionary
        })
      })
      // console.log(this.concepts)
      return this.concepts;
    } catch (error) {
      return console.error(error)
    }
  }
}
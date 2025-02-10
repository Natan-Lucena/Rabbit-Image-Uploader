export class Image {
  constructor(private _externalId: string, private _url: string) {}

  get externalId(): string {
    return this._externalId;
  }

  get url(): string {
    return this._url;
  }

  static create(externalId: string, url: string): Image {
    return new Image(externalId, url);
  }
}

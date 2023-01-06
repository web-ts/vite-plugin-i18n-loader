export interface MessageDictionary {
  [key: string]: string | number | MessageDictionary | Array<MessageDictionary>;
}

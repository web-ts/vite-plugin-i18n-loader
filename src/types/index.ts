export interface MessageDictionary {
  [key: string]: string | MessageDictionary | Array<MessageDictionary>;
}

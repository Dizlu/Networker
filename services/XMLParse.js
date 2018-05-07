// @flow
import XMLFetch from "./XMLFetch";
import * as fastXmlParser from "fast-xml-parser";

export default async (link: string = 'https://lublin.eu/rss/pl/41/2.xml') => {
  const data = await XMLFetch(link);

  let parsed = fastXmlParser.parse(data);

  return parsed;

}

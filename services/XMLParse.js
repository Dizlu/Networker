// @flow
import XMLFetch from "./XMLFetch";
import * as fastXmlParser from "fast-xml-parser";

export default async (link: string) => {
  const data = await XMLFetch('https://lublin.eu/rss/pl/41/2.xml');

  let parsed = fastXmlParser.parse(data);

  return parsed;

}

import path from 'path';
import { promises } from 'fs';
import fs from 'fs';
import matter from 'gray-matter';

const getPosts = async () => {
  const cwd = process.cwd();
  const markdownPath = path.join(cwd, 'markdown');
  const fileNames = await promises.readdir(markdownPath);
  return fileNames.map((fileName) => {
    const markdown = fs.readFileSync(path.join(markdownPath, fileName), 'utf-8');
    const id = fileName.replace(/\.md$/g, '');
    const {data: {title, date}, content} = matter(markdown);
    return {id, title, date};
  });
};

export default getPosts;

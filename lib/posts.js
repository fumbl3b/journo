import { remark } from 'remark';
import html from 'remark-html';
import images from 'remark-images';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(fn => {
        // remove the .md to get post id
        const id = fn.replace(/\.md$/, '');

        //process post into string
        const fullPath = path.join(postsDirectory, fn);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents);

        return {
            id, 
            ...matterResult.data
        }
    })

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)

    return fileNames.map(fn => {
        return {
            params: { id: fn.replace(/\.md$/, '') } 
        };
    })
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);
    const processedContent = await remark().use(html).use(images).process(matterResult.content);
    const contentHtml = processedContent.toString();

    console.log(processedContent);

    return {
        id,
        contentHtml,
         ...matterResult.data
    }
}
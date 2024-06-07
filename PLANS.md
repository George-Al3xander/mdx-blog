powerlifting website:

4 main sections:
Home - (
hero section - website name and brief description
latest posts - 5 latest articles
)
Articles -(
all articles paginated(5 articles per page) with search ability
type Article = {
title: string
id: string
description: string
content: string(markdown)
date: string
tags: string[]
author: string
originalSource?: string | {title: string, href: string}
}
type trainingProgram = Article & {file: string, type: strength | hypertrophy | mixed}
)
Training Programs: {
same logic as in the articles, but displays training programs
}
About Us {
just some information about project
}

db structure:
collections: articles, programs

current steps :
remake all data to be 

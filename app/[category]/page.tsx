import { PostgrestSingleResponse } from '@supabase/supabase-js'
import React from 'react'
import { supabase } from '../../utils/utils'
import { NotFoundTitle } from '../../components/notFound'

import classes from '../globals.module.css'
import { Center } from '@mantine/core'

import { ArticleType } from './[article]/page'
import { Article } from '../../components/article'

export async function generateStaticParams() {


    let { data: category }: any = await supabase.from('category').select('category_address_link')

    return category?.map((item: any) => {
        return { category: item.category_address_link }
    })


}


export default async function CategoryPage({ params }: { params: { category: string } }) {

    let { data: category } = await supabase.from('category')
        .select('*')
        .eq('category_address_link', params.category)
        .single()

    if (!category) return <Center className={classes.articleContainer} > <NotFoundTitle /> </Center>


    let { data: article }: PostgrestSingleResponse<ArticleType> = await supabase.from('article')
        .select('*')
        .eq('address_link', params.category)
        .single()


    if (!article) {

        let { data: categoryFirstArticle }: PostgrestSingleResponse<ArticleType> = await supabase
            .from('article')
            .select(`*`)
            .eq('category_id', category.id)
            .single()


        if (!categoryFirstArticle) return <Center className={classes.articleContainer} > first article not NotFound </Center>
        return (
            <div className={classes.articleContainer}  >
                <Article paragraph={categoryFirstArticle.article_content} title={categoryFirstArticle.article_title} author={categoryFirstArticle.author_name}  description={categoryFirstArticle.article_description} list={categoryFirstArticle.description_list} content_table={categoryFirstArticle.content_table} />
            </div>
        )

    }

    return (
        <div className={classes.articleContainer}  >
            <Article paragraph={article.article_content} title={article.article_title} author={article.author_name} description={article.article_description} list={article.description_list} content_table={article.content_table} />
        </div>
    )
}

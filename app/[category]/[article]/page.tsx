import React, { ReactNode } from 'react'
import { Article } from '../../../components/article'
import { PostgrestSingleResponse, createClient } from '@supabase/supabase-js'
import classes from './article.module.css'
import { Center } from '@mantine/core'
import NotFound from './not-found'
import { supabase } from '../../../utils/utils'

export type ArticleType = {
  article_title: string,
  author_name: string
  article_description: string,
  address_link: string,
  description_list: { label: string, description: string }[],
  content_table: { label: string, link: string, order: number }[],
  article_content: string
}





export async function generateStaticParams() {


  let { data }: any = await supabase
    
    .from('category')
    .select(`
      category_address_link,
      article (
        address_link
      )
    `)


  return data?.map((cate: any) => {
    return cate.article?.map((art: any) => {
      return { category: cate.category_address_link, article: art.address_link }
    })
  })

}

export default async function ArticlePage({ params }: { params: { category: string, article: string } }) {



  let { data }: PostgrestSingleResponse<ArticleType> = await supabase
  
  .from('article')
    .select('*')
    .eq('address_link', params.article)
    .single()



  if (!data) {
    return (<Center className={classes.articleContainer} ><NotFound /></Center>)
  }

  return (

    <>

      <div className={classes.articleContainer}  >
        <Article   paragraph={data.article_content} title={data.article_title} author={data.author_name}  description={data.article_description} list={data.description_list} content_table={data.content_table} />
      </div>
    </>

  )
}


import React, { ReactNode } from 'react'
import { Article } from '../../components/article'
import { PostgrestSingleResponse, createClient } from '@supabase/supabase-js'
import classes from './article.module.css'
import { Center } from '@mantine/core'
import NotFound from './not-found'

type Article = {
  article_title: string,
  article_description: string,
  address_link: string,
  description_list: { label: string, description: string }[] ,
  content_table: { label: string, link:string, order: number }[],
  article_content: string
}


export default async function Sort({ params }: { params: { article: string } }) {

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "")





  let { data } : PostgrestSingleResponse<Article> = await supabase.from('article').select('*')
    .eq('address_link', params.article)
    .single()


    



  if (!data) {
    return (<Center className={classes.articleContainer} ><NotFound /></Center>)
  }

  return (

    <>

      <div className={classes.articleContainer}  >
        <Article paragraph={data.article_content} title={data.article_title} description={data.article_description} list={data.description_list} content_table={data.content_table} />
      </div>
    </>

  )
}


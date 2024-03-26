import React from 'react'
import { articles } from './ArticalData'

export default function ReadHelpArticle() {
  return (
    <div className='flex flex-wrap justify-center items-start h-full p-4 overflow-y-auto'>
      {articles.map((a, index) => (
        <div key={index} className='max-w-sm rounded overflow-hidden shadow-lg m-4'>
          <img src={a.img} alt={a.title} className='w-full h-48 object-cover' />
          <div className='px-6 py-4'>
            <h1 className='font-bold text-xl mb-2'>{a.title}</h1>
            <p className='text-gray-700 text-base'>{a.article}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

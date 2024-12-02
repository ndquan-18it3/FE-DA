import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { POST_DETAIL, POST_LIKE_ACTION, useApi } from '../../api'
import RecentNews from '../../components/RecentNews'
import { useAppSelector } from '../../hooks/store'
import { dateFormat } from '../../utils'
import { CommentBar } from './CommentBar'
import './index.css'

export default function PostDetail() {
  const { slug = '' } = useParams()
  const [data, setData] = useState<Post>()
  const [liked, setLiked] = useState<boolean>(false)
  const { user } = useAppSelector((state) => state.auth)
  useEffect(() => {
    getData(slug)
  }, [])

  const getData = async (slug: string) => {
    const data = (await useApi.get(POST_DETAIL.replace(':slug', slug))).data as Post
    setLiked(data.liked)
    setData(data)
  }

  const handleLikePost = async () => {
    if (!user) return toast.info('Vui lòng đăng nhập')
    await useApi.get(POST_LIKE_ACTION.replace(':id', data?._id!))
    getData(slug)
  }

  if (!data) return <></>
  const { title, createdAt, createdBy, description, content, viewCount, likeCount, commentCount } = data
  return (
    <section id='blog-detail' className='blog-detail'>
      <div className='container' data-aos='fade-up'>
        <div className='row g-5'>
          <div className='col-lg-8'>
            <h2>{title}</h2>
            <div className='counter'>
              <button
                type='button'
                className={`btn ${liked ? 'btn btn-primary' : 'btn btn-secondary'} btn-like`}
                onClick={handleLikePost}>
                <i className='bi bi-hand-thumbs-up' /> Like
              </button>
              <span>
                <i className='bi bi-person'></i> {createdBy.name?.firstName}
              </span>
              <span>
                <i className='bi bi-clock'></i> <time dateTime='2022-01-01'>{dateFormat(createdAt)}</time>
              </span>
              <ul>
                <li className='d-flex align-items-center'>
                  <i className='bi bi-eye' />
                  {viewCount}
                </li>
                <li className='d-flex align-items-center'>
                  <i className='bi bi-hand-thumbs-up'></i>
                  {likeCount}
                </li>
                <li className='d-flex align-items-center'>
                  <i className='bi bi-chat-dots'></i> {commentCount}
                </li>
              </ul>
            </div>
            <br />
            <h5>{description}</h5>
            <br />
            <article dangerouslySetInnerHTML={{ __html: content }} />
            <CommentBar postId={data._id} />
          </div>

          <div className='col-lg-4'>
            <div className='sidebar'>
              <RecentNews />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Pagination } from 'swiper/modules'
import { useDispatch, useSelector } from 'react-redux'
import ForestCard from '@/components/ForestCard/ForestCard'
import './ForestPage.css'
import 'atropos/css'
import 'swiper/css'
import 'swiper/css/pagination'

import { RootState } from '@/stores/store.ts'
import { getStudentForestData } from '@/stores/features/forestSlice.ts'
import { LoginCheck } from '@/components'

const ForestStudentPage = () => {
  const memberId = useParams()
  const dummyData = [
    {
      forestId: '23e77f3c-30f1-4f64-a42c-8b42de61d0ed',
      startedAt: '2022-03-07',
      endedAt: '2023-03-05',
    },
    {
      forestId: '6b9cfd4c-e61a-4d2e-8ec5-55f92d2f5a19',
      startedAt: '2023-03-06',
      endedAt: '2024-03-03',
    },
  ]
  const forests =
    useSelector((state: RootState) => state.forest.studentForest) ?? dummyData
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getStudentForestData(memberId))
  }, [])

  return (
    <Swiper
      slidesPerView="auto"
      pagination={{ clickable: true }}
      mousewheel
      modules={[Mousewheel, Pagination]}
    >
      {forests?.map((forest: any) => (
        <SwiperSlide>
          <div className="forest-card-container">
            <ForestCard
              nav={forest.forestId}
              forestName={forest.startedAt}
              endedAt={forest.endedAt}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

// export default LoginCheck(ForestPage)
export default LoginCheck(ForestStudentPage)

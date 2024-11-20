import qs from 'qs'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { DOCTOR_LIST, useApi } from '../../../api'
import DoctorItem, { DoctorItemSkeleton } from '../../doctor/DoctorItem'
import './index.css'

export default function Doctor() {
  const [data, setData] = useState<Data<Doctor>>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const query = qs.stringify({ size: 12 })
    setLoading(true)
    const data = (await useApi.get(DOCTOR_LIST + (query ? '?' + query : ''))).data as Data<Doctor>
    setLoading(false)
    setData(data)
  }

  return (
    <section id='doctors' className='doctors'>
      <div className='container'>
        <div className='section-title'>
          <h2>Đội ngũ bác sĩ tai mũi họng chuyên nghiệp</h2>
          <p>
            Chúng tôi quy tụ đội ngũ bác sĩ, chuyên gia, và nhân viên y tế được đào tạo chuyên sâu về các vấn đề tai mũi
            họng. Với phương châm lấy bệnh nhân làm trung tâm, chúng tôi cam kết cung cấp dịch vụ chăm sóc sức khỏe toàn
            diện, chất lượng cao, giúp bạn phục hồi và duy trì sức khỏe tai mũi họng tốt nhất.
          </p>
        </div>
        <Slider
          slidesToShow={2}
          rows={2}
          slidesToScroll={1}
          autoplay
          speed={500}
          infinite
          dots
          responsive={[
            {
              breakpoint: 768,
              settings: {
                rows: 2,
                slidesPerRow: 1,
                slidesToShow: 1
              }
            }
          ]}>
          {data?.data.map((doctor) => (
            <div className='doctor-slider' key={doctor._id}>
              <DoctorItem data={doctor} />
            </div>
          ))}
          {loading &&
            [...Array(12)].map((_, index) => {
              return <DoctorItemSkeleton key={index} />
            })}
        </Slider>
      </div>
    </section>
  )
}

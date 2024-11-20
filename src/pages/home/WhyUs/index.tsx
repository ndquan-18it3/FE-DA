import './index.css'

export default function WhyUs() {
  return (
    <section id='why-us' className='why-us'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 d-flex align-items-stretch'>
            <div className='content'>
              <h3>Tai mũi họng</h3>
              <p>
                Chăm sóc sức khỏe tai mũi họng giúp cải thiện chất lượng sống và phòng tránh các biến chứng nghiêm
                trọng.
              </p>
              <h4>Sứ mệnh của chúng tôi</h4>
              <p>
                Chúng tôi đồng hành cùng bạn trong việc chẩn đoán và điều trị các vấn đề tai mũi họng, từ viêm xoang,
                viêm tai giữa, viêm họng đến các rối loạn phức tạp hơn. Mục tiêu của chúng tôi là mang lại hơi thở khỏe
                mạnh, giấc ngủ ngon và sự tự tin trong giao tiếp cho bạn.
              </p>
              <div className='text-center'>
                <a href='#' className='more-btn'>
                  Tìm hiểu thêm <i className='bx bx-chevron-right'></i>
                </a>
              </div>
            </div>
          </div>
          <div className='col-lg-8 d-flex align-items-stretch'>
            <div className='icon-boxes d-flex flex-column justify-content-center'>
              <div className='row'>
                <div className='col-xl-4 d-flex align-items-stretch'>
                  <div className='icon-box mt-4 mt-xl-0'>
                    <i className='bx bx-heart'></i>
                    <h4>Điều trị</h4>
                    <p>
                      Cung cấp phương pháp điều trị hiệu quả cho các vấn đề tai mũi họng, giảm đau và ngăn ngừa biến
                      chứng.
                    </p>
                  </div>
                </div>
                <div className='col-xl-4 d-flex align-items-stretch'>
                  <div className='icon-box mt-4 mt-xl-0'>
                    <i className='bx bx-shield'></i>
                    <h4>Phòng ngừa</h4>
                    <p>Phòng ngừa bệnh tai mũi họng qua vệ sinh đúng cách và kiểm tra sức khỏe định kỳ.</p>
                  </div>
                </div>
                <div className='col-xl-4 d-flex align-items-stretch'>
                  <div className='icon-box mt-4 mt-xl-0'>
                    <i className='bx bx-brain'></i>
                    <h4>Nghiên cứu & giáo dục</h4>
                    <p>Nghiên cứu phương pháp điều trị mới và cung cấp kiến thức giúp cộng đồng.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import './index.css'

export default function Services() {
  return (
    <>
      <section id='services' className='services'>
        <div className='container'>
          <div className='section-title'>
            <h2>Dịch vụ</h2>
            <p>
              Cung cấp các dịch vụ cần thiết để phòng ngừa và điều trị các bệnh lý tai mũi họng, bao gồm viêm họng, viêm
              xoang, mất thính lực và các vấn đề liên quan đến tai, mũi, họng.
            </p>
          </div>

          <div className='row'>
            <div className='col-lg-4 col-md-6 d-flex align-items-stretch'>
              <div className='icon-box'>
                <div className='icon'>
                  <i className='fa fa-user-nurse'></i>
                </div>
                <h4>
                  <a href='' className='title-theme'>
                    Tư vấn tai mũi họng
                  </a>
                </h4>
                <p>
                  Tư vấn và hỗ trợ cho những người gặp vấn đề về tai mũi họng, giúp họ tìm hiểu nguyên nhân và giải
                  quyết các triệu chứng như đau họng, nghẹt mũi, hoặc mất thính lực.
                </p>
              </div>
            </div>

            <div className='col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0'>
              <div className='icon-box'>
                <div className='icon'>
                  <i className='fa fa-notes-medical'></i>
                </div>
                <h4>
                  <a href='' className='title-theme'>
                    Điều trị tai mũi họng
                  </a>
                </h4>
                <p>
                  Cung cấp các phương pháp điều trị hiệu quả cho các bệnh lý như viêm họng, viêm xoang, viêm tai giữa,
                  mất thính lực và các vấn đề khác liên quan đến tai, mũi, họng, sử dụng công nghệ và phương pháp điều
                  trị hiện đại.
                </p>
              </div>
            </div>

            <div className='col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0'>
              <div className='icon-box'>
                <div className='icon'>
                  <i className='fa fa-calendar-check'></i>
                </div>
                <h4>
                  <a href='' className='title-theme'>
                    Đặt lịch hẹn khám
                  </a>
                </h4>
                <p>
                  Cho phép người dùng đặt lịch hẹn khám trên website, giúp tiết kiệm thời gian và tạo thuận lợi cho bệnh
                  nhân.
                </p>
              </div>
            </div>

            <div className='col-lg-4 col-md-6 d-flex align-items-stretch mt-4'>
              <div className='icon-box'>
                <div className='icon'>
                  <i className='fa fa-house-user'></i>
                </div>
                <h4>
                  <a href='' className='title-theme'>
                    Hỗ trợ cho gia đình
                  </a>
                </h4>
                <p>
                  Tư vấn và hỗ trợ gia đình trong việc chăm sóc sức khỏe tai mũi họng, giúp xây dựng thói quen bảo vệ
                  sức khỏe và phòng ngừa các bệnh lý cho tất cả các thành viên trong gia đình.
                </p>
              </div>
            </div>

            <div className='col-lg-4 col-md-6 d-flex align-items-stretch mt-4'>
              <div className='icon-box'>
                <div className='icon'>
                  <i className='fa fa-question'></i>
                </div>
                <h4>
                  <a href='' className='title-theme'>
                    Hỗ trợ sau điều trị
                  </a>
                </h4>
                <p>
                  Cung cấp hỗ trợ sau điều trị cho bệnh nhân, giúp theo dõi tiến trình phục hồi và duy trì sức khỏe tai
                  mũi họng lâu dài, bao gồm các hướng dẫn chăm sóc tại nhà và tái khám định kỳ.
                </p>
              </div>
            </div>

            <div className='col-lg-4 col-md-6 d-flex align-items-stretch mt-4'>
              <div className='icon-box'>
                <div className='icon'>
                  <i className='fas fa-capsules'></i>
                </div>
                <h4>
                  <a href='' className='title-theme'>
                    Tư vấn về thuốc
                  </a>
                </h4>
                <p>
                  Tư vấn về các loại thuốc và quy trình điều trị các bệnh tai mũi họng, giúp bệnh nhân hiểu rõ về cách
                  sử dụng thuốc và lựa chọn phương pháp điều trị hiệu quả.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

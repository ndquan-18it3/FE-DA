import './index.css'

export default function FAQ() {
  return (
    <section id='faq' className='faq section-bg'>
      <div className='container'>
        <div className='section-title'>
          <h2>Các câu hỏi thường gặp</h2>
        </div>

        <div className='faq-list'>
          <ul>
            <li data-aos='fade-up'>
              <i className='bx bx-help-circle icon-help'></i>
              <a data-bs-toggle='collapse' className='collapse' data-bs-target='#faq-list-1'>
                Tôi có thể đặt lịch khám online không?
                <i className='bx bx-chevron-down icon-show'></i>
                <i className='bx bx-chevron-up icon-close'></i>
              </a>
              <div id='faq-list-1' className='collapse show' data-bs-parent='.faq-list'>
                <p>
                  Có, bạn hoàn toàn có thể đặt lịch khám online thông qua trang web của chúng tôi. Chỉ cần nhấn vào nút
                  "Đặt lịch khám" ở góc trên cùng, sau đó điền thông tin cần thiết và chọn thời gian phù hợp. Bạn sẽ
                  nhận được xác nhận qua email.
                </p>
              </div>
            </li>

            <li data-aos='fade-up' data-aos-delay='100'>
              <i className='bx bx-help-circle icon-help'></i>
              <a data-bs-toggle='collapse' data-bs-target='#faq-list-2' className='collapsed'>
                Các dịch vụ khám tại phòng khám bao gồm những gì?
                <i className='bx bx-chevron-down icon-show'></i>
                <i className='bx bx-chevron-up icon-close'></i>
              </a>
              <div id='faq-list-2' className='collapse' data-bs-parent='.faq-list'>
                <p>
                  <ul className='list'>
                    <li>Khám và điều trị tai: Viêm tai giữa, mất thính lực, dị vật trong tai...</li>
                    <li>Khám và điều trị mũi: Viêm mũi dị ứng, viêm xoang, lệch vách ngăn mũi... </li>
                    <li>Khám và điều trị họng: Viêm amidan, đau họng, khàn tiếng...</li>
                    <li>Nội soi tai mũi họng: Đánh giá và phát hiện các vấn đề tiềm ẩn.</li>
                    <li>Tư vấn điều trị: Đưa ra giải pháp điều trị phù hợp nhất cho bạn.</li>
                  </ul>
                </p>
              </div>
            </li>

            <li data-aos='fade-up' data-aos-delay='200'>
              <i className='bx bx-help-circle icon-help'></i>
              <a data-bs-toggle='collapse' data-bs-target='#faq-list-3' className='collapsed'>
                Thời gian khám của phòng khám là khi nào?
                <i className='bx bx-chevron-down icon-show'></i>
                <i className='bx bx-chevron-up icon-close'></i>
              </a>
              <div id='faq-list-3' className='collapse' data-bs-parent='.faq-list'>
                <p>
                  Phòng khám tai mũi họng của chúng tôi hoạt động theo lịch sau: Thứ Hai đến Thứ Bảy: 7:30 - 17:30{' '}
                  <br />
                  Chúng tôi khuyến khích bạn đặt lịch trước để đảm bảo được phục vụ tốt nhất.
                </p>
              </div>
            </li>

            <li data-aos='fade-up' data-aos-delay='300'>
              <i className='bx bx-help-circle icon-help'></i>
              <a data-bs-toggle='collapse' data-bs-target='#faq-list-4' className='collapsed'>
                Khi nào tôi cần đến khám tai mũi họng?
                <i className='bx bx-chevron-down icon-show'></i>
                <i className='bx bx-chevron-up icon-close'></i>
              </a>
              <div id='faq-list-4' className='collapse' data-bs-parent='.faq-list'>
                <p>
                  <ul className='list'>
                    <li>Ù tai, giảm thính lực hoặc đau tai kéo dài.</li>
                    <li>Nghẹt mũi, chảy nước mũi kéo dài hoặc khó thở.</li>
                    <li>Đau họng, khàn tiếng hơn 2 tuần.</li>
                    <li>Dị vật trong tai, mũi, hoặc họng cần lấy ra ngay.</li>
                    <li>Các vấn đề tái phát nhiều lần như viêm xoang hoặc viêm tai giữa.</li>
                  </ul>
                </p>
              </div>
            </li>

            <li data-aos='fade-up' data-aos-delay='400'>
              <i className='bx bx-help-circle icon-help'></i>
              <a data-bs-toggle='collapse' data-bs-target='#faq-list-5' className='collapsed'>
                Phòng khám có hỗ trợ thanh toán bảo hiểm không?
                <i className='bx bx-chevron-down icon-show'></i>
                <i className='bx bx-chevron-up icon-close'></i>
              </a>
              <div id='faq-list-5' className='collapse' data-bs-parent='.faq-list'>
                <p>
                  Phòng khám hiện hỗ trợ một số loại bảo hiểm y tế và bảo hiểm tư nhân. Vui lòng mang theo thẻ bảo hiểm
                  và giấy tờ liên quan khi đến khám. Nếu bạn có thắc mắc về các loại bảo hiểm được chấp nhận, hãy liên
                  hệ trực tiếp qua số điện thoại hotline hoặc gửi câu hỏi trong mục liên hệ.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

import './index.css'

export default function Contact() {
  return (
    <section id='contact' className='contact'>
      <div className='container'>
        <div className='section-title'>
          <h2>Liên hệ</h2>
          <p>
            Chúng tôi luôn sẵn sàng lắng nghe ý kiến, góp ý và phản hồi của bạn. Nếu bạn có bất kỳ câu hỏi, yêu cầu hoặc
            đề xuất nào, xin vui lòng liên hệ với chúng tôi.
          </p>
        </div>
      </div>

      <div>
        <iframe
          style={{ border: 0, width: '100%', height: 350 }}
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61362.11737347115!2d108.21152783266668!3d16.006625128589327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142174c8f171ac3%3A0x5d1534b08f3a1fa0!2zTmfFqSBIw6BuaCBTxqFuLCBEYSBOYW5nLCBWaWV0bmFt!5e0!3m2!1sen!2sus!4v1731727171170!5m2!1sen!2sus'
          frameBorder={0}
          allowFullScreen></iframe>
      </div>

      <div className='container'>
        <div className='row mt-5'>
          <div className='col-lg-4'>
            <div className='info'>
              <div className='address'>
                <i className='bi bi-geo-alt'></i>
                <h4>Địa chỉ:</h4>
                <p>Ngu Hang Son, Da Nang, Viet Nam</p>
              </div>

              <div className='email'>
                <i className='bi bi-envelope'></i>
                <h4>Email:</h4>
                <p>ndquan.18it3@vku.udn.vn</p>
              </div>

              <div className='phone'>
                <i className='bi bi-phone'></i>
                <h4>Điện thoại:</h4>
                <p>0123456789</p>
              </div>
            </div>
          </div>
          {/* TODO */}
          <div className='col-lg-8 mt-5 mt-lg-0'>
            <form role='form' className='php-email-form'>
              <div className='row'>
                <div className='col-md-6 form-group'>
                  <input
                    type='text'
                    name='name'
                    className='form-control'
                    id='name'
                    placeholder='Tên của bạn'
                    required
                  />
                </div>
                <div className='col-md-6 form-group mt-3 mt-md-0'>
                  <input
                    type='email'
                    className='form-control'
                    name='email'
                    id='email'
                    placeholder='Email của bạn'
                    required
                  />
                </div>
              </div>
              <div className='form-group mt-3'>
                <input
                  type='text'
                  className='form-control'
                  name='subject'
                  id='subject'
                  placeholder='Tiêu đề'
                  required
                />
              </div>
              <div className='form-group mt-3'>
                <textarea className='form-control' name='message' rows={5} placeholder='Nội dung' required></textarea>
              </div>
              <div className='my-3'>
                <div className='loading'>Loading</div>
                <div className='error-message'></div>
                <div className='sent-message'>Your message has been sent. Thank you!</div>
              </div>
              <div className='text-center'>
                <button type='submit'>Gửi đi</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { RECORD_DETAIL, useApi } from '../../../api'
import { useAppSelector } from '../../../hooks/store'
import { avatarPath, dateFormat, hourFormat } from '../../../utils'
import './index.css'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default function RecordDetail() {
  const { id = '' } = useParams()
  const [data, setData] = useState<Appointment>()
  const role = useAppSelector((state) => state.auth.user?.role)

  useEffect(() => {
    ;(async () => {
      const data = await useApi.get(RECORD_DETAIL.replace(':id', id))
      setData(data.data)
    })()
  }, [id])

  if (!data) return <></>
  const { user, doctor, record } = data
  return (
    <section className='section record-detail'>
      <section className='section profile'>
        <div className='row'>
          <div className='col-xl-12'>
            <div className='card' id='profile-edit'>
              <div className='card-body pt-3'>
                <form>
                  <div className='row mb-3'>
                    <label htmlFor='profileImage' className='col-md-4 col-lg-3 col-form-label'>
                      {/* Ảnh đại diện */}
                    </label>
                    <div className='col-md-8 col-lg-9'>
                      <img src={avatarPath(data?.user?.avatar)} alt={data?.user?.avatar} className='avatar-img' />
                    </div>
                  </div>

                  <div className='row mb-3'>
                    <label htmlFor='dayIn' className='col-md-4 col-lg-3 col-form-label'>
                      Thời gian
                    </label>
                    <div className='col-md-8 col-lg-9'>
                      <input
                        type='text'
                        id='dayIn'
                        className='form-control'
                        placeholder='DD/MM/YYYY'
                        disabled
                        value={
                          hourFormat(data?.from) +
                          ' - ' +
                          hourFormat(data?.to) +
                          ' - ' +
                          dateFormat(data?.date, 'dd/MM/yyy')
                        }
                      />
                    </div>
                  </div>

                  <div className='row mb-3'>
                    <label htmlFor='dayIn' className='col-md-4 col-lg-3 col-form-label'>
                      Phòng
                    </label>
                    <div className='col-md-8 col-lg-9'>
                      <input type='text' id='dayIn' className='form-control' disabled value={data?.room} />
                    </div>
                  </div>

                  <hr />

                  <div className='row mb-3'>
                    <label htmlFor='fullName' className='col-md-4 col-lg-3 col-form-label'>
                      Họ và tên
                    </label>
                    <div className='col-md-8 col-lg-9'>
                      <input type='text' id='fullName' className='form-control' disabled value={data?.name} />
                    </div>
                  </div>

                  <div className='row mb-3'>
                    <label htmlFor='phone' className='col-md-4 col-lg-3 col-form-label'>
                      Số điện thoại
                    </label>
                    <div className='col-md-8 col-lg-9'>
                      <input type='tel' id='phone' className='form-control' disabled value={data?.phone} />
                    </div>
                  </div>

                  <div className='row mb-3'>
                    <label htmlFor='gender' className='col-md-4 col-lg-3 col-form-label'>
                      Giới tính
                    </label>
                    <div className='col-md-8 col-lg-9'>
                      <select
                        id='gender'
                        className='form-select'
                        aria-label='Default select example'
                        disabled
                        value={data?.user?.gender ?? '3'}>
                        <option value='1'>Nam</option>
                        <option value='2'>Nữ</option>
                        <option value='3'>Ẩn</option>
                      </select>
                    </div>
                  </div>

                  <div className='row mb-3'>
                    <label htmlFor='numberId' className='col-md-4 col-lg-3 col-form-label'>
                      Mã định danh
                    </label>
                    <div className='col-md-8 col-lg-9'>
                      <input type='tel' id='numberId' className='form-control' disabled value={data?.user?.numberId} />
                    </div>
                  </div>

                  <div className='row mb-3'>
                    <label htmlFor='birthday' className='col-md-4 col-lg-3 col-form-label'>
                      Ngày sinh
                    </label>
                    <div className='col-md-8 col-lg-9'>
                      <input
                        type='date'
                        id='birthday'
                        className='form-control'
                        placeholder='DD/MM/YYYY'
                        disabled
                        value={data?.user?.birthday}
                      />
                    </div>
                  </div>

                  <div className='row mb-3'>
                    <label htmlFor='address' className='col-md-4 col-lg-3 col-form-label'>
                      Địa chỉ
                    </label>
                    <div className='col-md-8 col-lg-9'>
                      <input type='text' id='address' className='form-control' disabled value={data?.user?.address} />
                    </div>
                  </div>
                  <hr />

                  {/* <div className='row mb-3'>
                        <label htmlFor='medicalHistory' className='col-md-4 col-lg-3 col-form-label'>
                          Bệnh sử
                        </label>
                        <div className='col-md-8 col-lg-9'>
                          <textarea className='form-control' id='medicalHistory' rows={5} {...register('medicalHistory')} />
                          {errors.medicalHistory && (
                            <span className='form-error-message'>{errors.medicalHistory.message}</span>
                          )}
                        </div>
                      </div>
      
                      <div className='row mb-3'>
                        <label htmlFor='reason' className='col-md-4 col-lg-3 col-form-label'>
                          Lý do khám bệnh
                        </label>
                        <div className='col-md-8 col-lg-9'>
                          <textarea className='form-control' id='reason' rows={5} {...register('reason')} />
                          {errors.reason && <span className='form-error-message'>{errors.reason.message}</span>}
                        </div>
                      </div>
      
                      <div className='row mb-3'>
                        <label htmlFor='status' className='col-md-4 col-lg-3 col-form-label'>
                          Tình trạng ban đầu
                        </label>
                        <div className='col-md-8 col-lg-9'>
                          <textarea className='form-control' id='status' rows={5} {...register('status')} />
                          {errors.status && <span className='form-error-message'>{errors.status.message}</span>}
                        </div>
                      </div>
      
                      <div className='row mb-3'>
                        <label htmlFor='diagnostic' className='col-md-4 col-lg-3 col-form-label'>
                          Chẩn đoán bệnh
                        </label>
                        <div className='col-md-8 col-lg-9'>
                          <textarea className='form-control' id='diagnostic' rows={5} {...register('diagnostic')} />
                          {errors.diagnostic && <span className='form-error-message'>{errors.diagnostic.message}</span>}
                        </div>
                      </div>
      
                      <div className='row mb-3'>
                        <label htmlFor='treatment' className='col-md-4 col-lg-3 col-form-label'>
                          Phương pháp điều trị
                        </label>
                        <div className='col-md-8 col-lg-9'>
                          <textarea className='form-control' id='treatment' rows={5} {...register('treatment')} />
                          {errors.treatment && <span className='form-error-message'>{errors.treatment.message}</span>}
                        </div>
                      </div> */}
                </form>
                <p dangerouslySetInnerHTML={{ __html: record! }} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <p dangerouslySetInnerHTML={{ __html: record! }} /> */}
      {/* <div className='p-3 header'>
        <div>
          <span>Lịch sử thay đổi: </span>
          <br />
          <span>
            {histories.map((record, idx) => {
              return (
                <>
                  <b>{`[${idx + 1}] `}</b>
                  <span
                    onClick={() => setHistoryIndex(idx)}
                    className={`history ${historyIndex === idx && 'active'}`}
                    key={idx}>
                    {dateFormat(record.pushedAt)}
                  </span>
                </>
              )
            })}
            <span
              onClick={() => setHistoryIndex(undefined)}
              className={`history ${historyIndex === undefined && 'active'}`}>
              Hiện tại
            </span>
          </span>
          <br />
          <br />
          {role === 'doctor' && (
            <Link to={`/dashboard/medical-record?numberId=${user?.numberId}`}>
              <u>
                <i>Xem tất cả bệnh án của bệnh nhân</i>
              </u>
            </Link>
          )}
        </div>
        {role === 'doctor' && (
          <Link to={`/dashboard/medical-record/update/${record.id}`} type='submit' className='btn btn-primary'>
            Chỉnh sửa
          </Link>
        )}
      </div> */}
      {/* <div className='card'>
        <div className='card-body pt-3'>
          <h4 className='text-center'>BỆNH ÁN TÂM THẦN {historyIndex != undefined && `[${historyIndex + 1}]`}</h4>
          <h5>THÔNG TIN CÁ NHÂN</h5>
          <ul className='p-3'>
            <ol className='row g-3'>
              <li>Họ và tên bệnh nhân: {user?.fullName}</li>
              <li>Giới tính: {user?.gender == 1 ? 'Nam' : 'Nữ'}</li>
              <li>Ngày sinh: {dateFormat(user?.birthday, 'dd/MM/yyy')}</li>
              <li>Mã định danh: {user?.numberId}</li>
              <li>Nghề nghiệp: {user?.job}</li>
              <li>Địa chỉ: {user?.address}</li>
              <li>Số điện thoại liên hệ: {user?.phone}</li>
              <li>Địa chỉ email (nếu có): {user?.email}</li>
              <li>Ngày khám bệnh: {dateFormat(data.dayIn)}</li>
              <hr />
            </ol>
            <ol className='row g-3'>
              <li>Bác sĩ khám bệnh: {doctor?.fullName}</li>
              <li>Số điện thoại liên hệ: {doctor?.phone}</li>
              <li>Địa chỉ email: {doctor?.email}</li>
            </ol>
          </ul>
          <hr />
          <h5>Bệnh sử</h5>
          <p>{data.medicalHistory}</p>
          <h5>Lý do khám bệnh</h5>
          <p>{data.reason}</p>
          <h5>Tình trạng ban đầu</h5>
          <p>{data.status}</p>
          <h5>Chuẩn đoán bệnh</h5>
          <p>{data.diagnostic}</p>
          <h5>Phương pháp điều trị</h5>
          <p>{data.treatment}</p>
        </div>
      </div> */}
    </section>
  )
}

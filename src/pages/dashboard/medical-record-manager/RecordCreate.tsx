import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { CREATE_RECORD, GET_SCHEDULE, RECORD_LIST, useApi } from '../../../api'
import { avatarPath, dateFormat, hourFormat } from '../../../utils'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

type MedicalRecord = {
  record?: string
}
export default function RecordCreate() {
  const { id = '' } = useParams()
  const [appointment, setAppointment] = useState<Appointment>()
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([useApi.get(GET_SCHEDULE.replace(':id', id))]).then(([res]) => {
      setAppointment(res.data)
      reset({ ...res.data, record: getValues('record') })
    })
  }, [])

  const schema = yup
    .object<MedicalRecord>({
      record: yup.string().required('Không để trống')
    })
    .required()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue
  } = useForm<MedicalRecord>({
    defaultValues: {
      record:
        '<ol><li>Hỏi bệnh<ol><li>Lý do vào viện<br>.<br>.</li><li>Bệnh sử<br>.<br>.</li><li>Tiền sử<br>.<br>.</li></ol></li><li>Khám bênh<ol><li>Khám toàn thân<br>.<br>.</li><li>Khám tai mũi họng<br>.<br>.</li><li>Khám bộ phận<br>.<br>.</li></ol></li><li>Tóm tắt bệnh án<br>.<br>.</li><li>Kết quả xét nghiệm<br>.<br>.</li><li>Chuẩn đoán xác định<br>.<br>.</li></ol>'
    },
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: MedicalRecord) => {
    await useApi.patch(CREATE_RECORD.replace(':id', id), {
      record: data.record
    })
    toast.success('Hoàn tất, dữ liệu sẽ cập nhật trong chốc lát')
    navigate('/dashboard/medical-record/')
  }

  if (!appointment) return <></>
  return (
    <section className='section profile'>
      <div className='row'>
        <div className='col-xl-12'>
          <div className='card' id='profile-edit'>
            <div className='card-body pt-3'>
              <form onSubmit={handleSubmit(onSubmit, (invalid) => console.log(invalid))}>
                <div className='row mb-3'>
                  <label htmlFor='profileImage' className='col-md-4 col-lg-3 col-form-label'>
                    {/* Ảnh đại diện */}
                  </label>
                  <div className='col-md-8 col-lg-9'>
                    <img
                      src={avatarPath(appointment?.user?.avatar)}
                      alt={appointment?.user?.avatar}
                      className='avatar-img'
                    />
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
                        hourFormat(appointment?.from) +
                        ' - ' +
                        hourFormat(appointment?.to) +
                        ' - ' +
                        dateFormat(appointment?.date, 'dd/MM/yyy')
                      }
                    />
                  </div>
                </div>

                <div className='row mb-3'>
                  <label htmlFor='dayIn' className='col-md-4 col-lg-3 col-form-label'>
                    Phòng
                  </label>
                  <div className='col-md-8 col-lg-9'>
                    <input type='text' id='dayIn' className='form-control' disabled value={appointment?.room} />
                  </div>
                </div>

                <hr />

                <div className='row mb-3'>
                  <label htmlFor='fullName' className='col-md-4 col-lg-3 col-form-label'>
                    Họ và tên
                  </label>
                  <div className='col-md-8 col-lg-9'>
                    <input type='text' id='fullName' className='form-control' disabled value={appointment?.name} />
                  </div>
                </div>

                <div className='row mb-3'>
                  <label htmlFor='phone' className='col-md-4 col-lg-3 col-form-label'>
                    Số điện thoại
                  </label>
                  <div className='col-md-8 col-lg-9'>
                    <input type='tel' id='phone' className='form-control' disabled value={appointment?.phone} />
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
                      value={appointment?.user?.gender ?? '3'}>
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
                    <input
                      type='tel'
                      id='numberId'
                      className='form-control'
                      disabled
                      value={appointment?.user?.numberId}
                    />
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
                      value={appointment?.user?.birthday}
                    />
                  </div>
                </div>

                <div className='row mb-3'>
                  <label htmlFor='address' className='col-md-4 col-lg-3 col-form-label'>
                    Địa chỉ
                  </label>
                  <div className='col-md-8 col-lg-9'>
                    <input
                      type='text'
                      id='address'
                      className='form-control'
                      disabled
                      value={appointment?.user?.address}
                    />
                  </div>
                </div>
                <hr />

                <div>
                  <label htmlFor='content' className='col-md-2 col-lg-2 col-form-label'>
                    Thông tin
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={getValues('record')}
                    onBlur={(_, editor) => {
                      setValue('record', editor.getData())
                    }}
                  />
                  <br />
                </div>
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

                <div className='text-center'>
                  <button type='submit' className='btn btn-primary'>
                    Xác nhận
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAppSelector } from '../../../hooks/store'
import { phoneRegExp } from '../../../utils'

type StepOneInputs = {
  name?: string
  phone?: string
  service?: string
  note?: string
}

type StepTwoInputs = {
  date?: string
  time?: string
}

export const StepOneSchedule = (props: any) => {
  const [submitted, setSubmitted] = useState(false)
  const { user } = useAppSelector((state) => state.auth)

  const schema = yup.object<StepOneInputs>({
    name: yup.string().required('Không để trống'),
    phone: yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Không để trống'),
    service: yup.string().required('Không để trống'),
    note: yup.string().nullable()
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<StepOneInputs>({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (user) {
      const defaultValues: StepOneInputs = {
        name: user?.fullName,
        phone: user?.phone
      }
      reset(defaultValues)
    }
  }, [user])

  const onSubmit = async (data: StepOneInputs) => {
    setSubmitted(true)
    props.actionProvider.handleAddMessageToState('Cảm ơn vì thông tin của bạn.')
    props.actionProvider.handleAddMessageToState('Vui lòng chọn thời gian khám bệnh để tiếp tục.', 'schedule2')
  }

  return (
    <div className='appointment-scheduling'>
      <form onSubmit={handleSubmit(onSubmit, (invalid) => console.log(invalid))}>
        <div className='row mb-2'>
          <label htmlFor='name' className='col-md-4 col-lg-3 col-form-label'>
            Họ và tên *
          </label>
          <div className='col-md-8 col-lg-9'>
            <input type='text' id='name' className='form-control' {...register('name')} disabled={submitted} />
            {errors.name && <span className='form-error-message'>{errors.name.message}</span>}
          </div>
        </div>
        <div className='row mb-2'>
          <label htmlFor='phone' className='col-md-4 col-lg-3 col-form-label'>
            Số điện thoại *
          </label>
          <div className='col-md-8 col-lg-9'>
            <input type='text' id='phone' className='form-control' {...register('phone')} disabled={submitted} />
            {errors.phone && <span className='form-error-message'>{errors.phone.message}</span>}
          </div>
        </div>
        <div className='row mb-2'>
          <label htmlFor='service' className='col-md-4 col-lg-3 col-form-label'>
            Dịch vụ khám *
          </label>
          <div className='col-md-8 col-lg-9'>
            <select
              id='service'
              className='form-select'
              aria-label='Default select example'
              {...register('service')}
              disabled={submitted}>
              <option value='1'>Tai</option>
              <option value='2'>Mũi</option>
              <option value='3'>Họng</option>
              <option value='4'>Khác</option>
            </select>
            {errors.service && <span className='form-error-message'>{errors.service.message}</span>}
          </div>
        </div>
        <div className='row mb-2'>
          <label htmlFor='note' className='col-md-4 col-lg-3 col-form-label'>
            Ghi chú
          </label>
          <div className='col-md-8 col-lg-9'>
            <textarea
              className='form-control'
              id='note'
              style={{ height: 100 }}
              placeholder=''
              {...register('note')}
              disabled={submitted}
            />
          </div>
        </div>
        <span>Nếu thông tin của bạn là chính xác, nhấn xác nhận để tiếp tục.</span>
        <br />
        <br />
        {!submitted && (
          <button type='submit' className='btn btn-primary btn-sm'>
            Xác nhận
          </button>
        )}
      </form>
    </div>
  )
}

export const StepTwoSchedule = (props: any) => {
  const [submitted, setSubmitted] = useState(false)
  const today = new Date()
  const formattedToday = today.toISOString().split('T')[0] // "YYYY-MM-DD"

  const schema = yup.object<StepTwoInputs>({
    date: yup
      .string()
      .required('Không để trống')
      .test('date', 'Thời gian đã qua, vui lòng chọn thòi gian sắp tới', (value) => {
        if (!value) return false
        return value >= formattedToday
      }),
    time: yup
      .string()
      .required('Không để trống')
      .test('date', 'Thời gian đã qua, vui lòng chọn thòi gian sắp tới', (value) => {
        const date = getValues('date')
        if (!date) return false
        if (date > formattedToday) return true
        if (date < formattedToday) return false
        if (value == '1') {
          if (today.getHours() > 11) return false
        } else {
          if (today.getHours() > 17) return false
        }
        return true
      })
  })

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<StepTwoInputs>({
    resolver: yupResolver(schema),
    defaultValues: { date: formattedToday }
  })

  const onSubmit = async (data: StepTwoInputs) => {
    setSubmitted(true)
    props.actionProvider.handleAddMessageToState('Chúng tôi đang tiến hành xếp lịch cho bạn, vui lòng chờ!')
  }

  return (
    <div className='appointment-scheduling'>
      <form onSubmit={handleSubmit(onSubmit, (invalid) => console.log(invalid))}>
        <div className='row mb-2'>
          <label htmlFor='day' className='col-md-4 col-lg-3 col-form-label'>
            Ngày *
          </label>
          <div className='col-md-8 col-lg-9'>
            <input
              type='date'
              id='day'
              className='form-control'
              placeholder='DD/MM/YYYY'
              {...register('date')}
              disabled={submitted}
            />
            {errors.date && <span className='form-error-message'>{errors.date.message}</span>}
          </div>
        </div>
        <div className='row mb-2'>
          <label htmlFor='session' className='col-md-4 col-lg-3 col-form-label'>
            Thời gian *
          </label>
          <div className='col-md-8 col-lg-9'>
            <select
              id='session'
              className='form-select'
              aria-label='Default select example'
              {...register('time')}
              disabled={submitted}>
              <option value={1}>Buổi sáng</option>
              <option value={2}>Buổi chiều</option>
            </select>
            {errors.time && <span className='form-error-message'>{errors.time.message}</span>}
          </div>
        </div>

        <span>Nhấn xác nhận để tiếp tục.</span>
        <br />
        <br />
        {!submitted && (
          <button type='submit' className='btn btn-primary btn-sm'>
            Xác nhận
          </button>
        )}
      </form>
    </div>
  )
}

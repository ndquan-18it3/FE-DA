import { yupResolver } from '@hookform/resolvers/yup'
import { addDays, format, sub } from 'date-fns'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { AppointmentInfo } from '.'
import { PATIENT_REGISTRATION_BOOKED, useApi } from '../../api'
import { SCHEDULE_TIME_HOOK, SCHEDULE_DAY as SD, defaultSchedule } from '../../constants'
import { useAppSelector } from '../../hooks/store'
import { hourFormat, phoneRegExp } from '../../utils'
import './index.css'

type Props = {
  doctor?: Doctor
  info?: AppointmentInfo
  onSelect: (data?: AppointmentInfo) => void
}

const SCHEDULE_DAY: { [key: string]: string } = SD

export default function TimeSelect(props: Props) {
  const { doctor, onSelect } = props
  const [tab, setTab] = useState<{ day: string; nextweek: boolean }>()
  const [booked, setBooked] = useState<string[]>([])
  const role = useAppSelector((state) => state.auth.user?.role)
  const [selected, setSelected] = useState<number | undefined>()
  const [data, setData] = useState<AppointmentInfo | undefined>(props.info)

  if (doctor && !doctor?.timeServing) return <h5>Lịch khám bệnh hiện không có hoặc chưa được thiết lập</h5>

  const now = new Date()
  const toDay = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  const currentDay = new Date().getDay()
  const currentTab = Object.keys(SCHEDULE_DAY).findIndex((v) => v == tab?.day) + (tab?.nextweek === true ? 7 : 0)

  const TabList = () => {
    return (
      <>
        {Object.keys(SCHEDULE_DAY).map((day, idx) => {
          return (
            <li className='nav-item' role='presentation' key={idx}>
              <button
                className={`nav-link ${tab?.day === day && tab.nextweek === false ? 'active' : ''}`}
                id={`day-tab-${idx}`}
                data-bs-toggle='tab'
                data-bs-target={`#day-${idx}`}
                type='button'
                role='tab'
                aria-controls={`day-${idx}`}
                aria-selected='true'
                onClick={() => setTab({ day, nextweek: false })}>
                {format(sub(toDay, { days: now.getDay() - idx }), 'dd/MM') + ' - ' + SCHEDULE_DAY[day]}
              </button>
            </li>
          )
        })}
        {Object.keys(SCHEDULE_DAY).map((day, i) => {
          const idx = 7 + i
          return (
            <li className='nav-item' role='presentation' key={'nw' + i}>
              <button
                className={`nav-link ${tab?.day === day && tab.nextweek === true ? 'active' : ''}`}
                id={`day-tab-${idx}`}
                data-bs-toggle='tab'
                data-bs-target={`#day-${idx}`}
                type='button'
                role='tab'
                aria-controls={`day-${idx}`}
                aria-selected='true'
                onClick={() => setTab({ day, nextweek: true })}>
                {format(sub(toDay, { days: now.getDay() - idx }), 'dd/MM') + ' - ' + SCHEDULE_DAY[day]}
              </button>
            </li>
          )
        })}
      </>
    )
  }

  const TabContents = () => {
    return (
      <>
        {Object.keys(SCHEDULE_DAY).map((d, idx) => {
          const day = d as keyof typeof SD
          const schedule = doctor ? doctor?.timeServing?.[day] || [] : defaultSchedule[day]
          return (
            <div
              key={idx}
              className={`tab-pane fade show ${tab?.day === day && tab.nextweek === false ? 'active' : ''}`}
              id={`day-${idx}`}
              role='tabpanel'
              aria-labelledby={`day-tab-${idx}`}>
              {schedule.map((time, i) => {
                const from = SCHEDULE_TIME_HOOK.getTime() + time.from
                const to = SCHEDULE_TIME_HOOK.getTime() + time.to
                const label = hourFormat(from) + ' - ' + hourFormat(to) + (time?.room ? ` [${time?.room}] ` : '')

                const isBooked = booked.some(
                  (v) =>
                    new Date(v).getTime() === addDays(toDay.getTime() + time.from, currentTab - currentDay).getTime()
                )

                const isSelected = selected === addDays(toDay.getTime() + time.from, currentTab - currentDay).getTime()

                return (
                  <div key={`tw${i}-${idx}`}>
                    {isBooked ? (
                      <span
                        onClick={() => toast.warn('Đã có ai đó đặt lịch vào thời gian này')}
                        className='time-chip time-chip-error badge bg-danger'>
                        {label}
                      </span>
                    ) : (
                      <span
                        onClick={() => handleSelect(time, time?.room)}
                        className={`time-chip badge ${isSelected ? 'bg-success' : 'bg-secondary'}`}>
                        {label}
                      </span>
                    )}
                  </div>
                )
              })}
              {!schedule?.length && <span className='time-chip time-chip-error badge bg-danger'>Không tìm thấy</span>}
            </div>
          )
        })}
        {Object.keys(SCHEDULE_DAY).map((d, i) => {
          const idx = 7 + i
          const day = d as keyof typeof SD
          const schedule = doctor ? doctor?.timeServing?.[day] || [] : defaultSchedule[day]
          return (
            <div
              key={i}
              className={`tab-pane fade show ${tab?.day === day && tab.nextweek === true ? 'active' : ''}`}
              id={`day-${idx}`}
              role='tabpanel'
              aria-labelledby={`day-tab-${idx}`}>
              {schedule.map((time, idx) => {
                const from = SCHEDULE_TIME_HOOK.getTime() + time.from + 7 * 24 * 60 * 60 * 1000
                const to = SCHEDULE_TIME_HOOK.getTime() + time.to + 7 * 24 * 60 * 60 * 1000
                const label = hourFormat(from) + ' - ' + hourFormat(to) + (time?.room ? ` [${time?.room}] ` : '')
                const isBooked = booked.some(
                  (v) =>
                    new Date(v).getTime() === addDays(toDay.getTime() + time.from, currentTab - currentDay).getTime()
                )

                const isSelected = selected === addDays(toDay.getTime() + time.from, currentTab - currentDay).getTime()
                return (
                  <div key={`nw${idx}$-${i}`}>
                    {isBooked ? (
                      <span
                        onClick={() => toast.warn('Đã có ai đó đặt lịch vào thời gian này')}
                        className='time-chip time-chip-error badge bg-danger'>
                        {label}
                      </span>
                    ) : (
                      <span
                        onClick={() => handleSelect(time, time?.room)}
                        className={`time-chip badge ${isSelected ? 'bg-success' : 'bg-secondary'}`}>
                        {label}
                      </span>
                    )}
                  </div>
                )
              })}
              {!schedule?.length && <span className='time-chip time-chip-error badge bg-danger'>Không tìm thấy</span>}
            </div>
          )
        })}
      </>
    )
  }

  const handleSelect = (schedule: Schedule, room?: string) => {
    if (role !== 'user' && role != undefined)
      return toast.warn('Chỉ bệnh nhận mới có thể đặt lịch khám, vui lòng kiểm tra lại!')
    const bookingFrom = addDays(new Date(toDay.getTime() + schedule.from), currentTab - currentDay)
    const bookingTo = addDays(new Date(toDay.getTime() + schedule.to), currentTab - currentDay)
    if (bookingFrom.getTime() < toDay.getTime() + 24 * 60 * 60 * 1000)
      return toast.warn('Bạn phải đặt sớm hơn ít nhất một ngày, vui lòng chọn thời gian khác')
    setSelected(bookingFrom.getTime())
    setData({
      from: bookingFrom,
      to: bookingTo,
      date: addDays(new Date(toDay.getTime()), currentTab - currentDay),
      room: room
    })
    // onSelect({ from: bookingFrom.getTime(), to: bookingTo.getTime(), room: schedule.room })
  }

  const onSubmit = (info: AppointmentInfo) => {
    const newData = { ...data, ...info }
    onSelect(newData)
  }

  useEffect(() => {
    doctor && getBooked()
    setTab({ day: Object.keys(SCHEDULE_DAY)[currentDay], nextweek: false })
  }, [doctor])

  const getBooked = async () => {
    await useApi.get(PATIENT_REGISTRATION_BOOKED.replace(':id', doctor?._id || '')).then((res) => {
      setBooked(res.data)
    })
  }

  return (
    <div className='card time-select d-flex row gap-4'>
      <div className='card-body col-md-8 row'>
        <ul className='nav nav-tabs d-flex' id='myTab' role='tablist'>
          {<TabList />}
        </ul>
        <div className='tab-content pt-2' id='myTabContent'>
          {<TabContents />}
        </div>
      </div>
      <div className='col-md-4 p-0'>
        <Info onSubmit={onSubmit} />
      </div>
    </div>
  )
}

export const Info = ({ onSubmit }: { onSubmit: (data: AppointmentInfo) => void }) => {
  const { user } = useAppSelector((state) => state.auth)

  const today = new Date()
  const formattedToday = today.toISOString().split('T')[0] // "YYYY-MM-DD"

  const schema = yup.object<AppointmentInfo>({
    name: yup.string().required('Không để trống'),
    phone: yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Không để trống'),
    note: yup.string().nullable()
  })

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm<AppointmentInfo>({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (user) {
      const defaultValues: AppointmentInfo = {
        name: user?.fullName,
        phone: user?.phone
      }
      reset(defaultValues)
    }
  }, [user])

  return (
    <div className='appointment-scheduling'>
      <form onSubmit={handleSubmit(onSubmit, (invalid) => console.log(invalid))}>
        <div className='row'>
          <div className='col-md-12'>
            {' '}
            <div className='row mb-2'>
              <label htmlFor='name' className='col-form-label'>
                Họ và tên *
              </label>
              <div>
                <input type='text' id='name' className='form-control' {...register('name')} />
                {errors.name && <span className='form-error-message'>{errors.name.message}</span>}
              </div>
            </div>
            <div className='row mb-2'>
              <label htmlFor='phone' className='col-form-label'>
                Số điện thoại *
              </label>
              <div>
                <input type='text' id='phone' className='form-control' {...register('phone')} />
                {errors.phone && <span className='form-error-message'>{errors.phone.message}</span>}
              </div>
            </div>
            <div className='row mb-2'>
              <label htmlFor='note' className='col-form-label'>
                Ghi chú
              </label>
              <div>
                <textarea
                  className='form-control'
                  id='note'
                  style={{ height: 100 }}
                  placeholder='Tình trạng hoặc triệu chứng...'
                  {...register('note')}
                />
              </div>
            </div>
          </div>

          <div className='mt-4 fw-light'>
            <i>Nhấn xác nhận để tiếp tục. Chúng tôi sẽ xếp lịch trên những thông tin bạn cung cấp.</i>
          </div>
        </div>
        {
          <div className='d-flex justify-content-center mt-1'>
            <button type='submit' className='btn btn-primary btn-sm'>
              Xác nhận
            </button>
          </div>
        }
      </form>
    </div>
  )
}

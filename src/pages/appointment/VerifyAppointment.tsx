import { toast } from 'react-toastify'
import { APPOINTMENT_SCHEDULING, PATIENT_REGISTRATION, useApi } from '../../api'
import { dateFormat } from '../../utils'
import { AppointmentInfo } from '.'
import { useAppSelector } from '../../hooks/store'

type Props = {
  doctor?: Doctor
  info?: AppointmentInfo
  onSubmit?: () => void
}

export default function VerifyAppointment(props: Props) {
  const { doctor, info, onSubmit } = props
  const { user } = useAppSelector((state) => state.auth)
  // if (!doctor || !timeSelect) return <></>;

  const handleSubmit = async () => {
    const data = {
      doctorId: doctor ? doctor._id : undefined,
      userId: user ? user._id : undefined,
      ...info,
      session: 0,
      service: 0,
      from: info?.from?.getTime()! - info?.date?.getTime()!,
      to: info?.to?.getTime()! - info?.date?.getTime()!
    }

    await useApi
      .post(APPOINTMENT_SCHEDULING, data)
      .then((res: any) => {
        toast.success(res.data?.message)
        onSubmit && onSubmit()
      })
      .catch((error: any) => {
        toast.error(error?.response?.data?.message)
      })

    // const data = {
    //   doctorId: doctor ? doctor._id : undefined,
    //   from: info?.from,
    //   to: info?.to,
    //   room: info?.room
    // }

    // await useApi
    //   .post(PATIENT_REGISTRATION, data)
    //   .then((res: any) => {
    //     toast.success(res.data?.message)
    //     onSubmit && onSubmit()
    //   })
    //   .catch((error: any) => {
    //     toast.error(error?.response?.data?.message)
    //   })
  }

  return (
    <div className='appointment-verify'>
      <h4>Xác nhận lịch khám</h4>
      <br />
      <h5>Bác sĩ: {doctor ? doctor?.fullName : 'được sắp xếp sau'}</h5>
      <h6>Thời gian: {dateFormat(info?.from || '')}</h6>
      <h6>Phòng: {info?.room}</h6>
      <br />
      <button onClick={handleSubmit} type='button' className='btn btn-success rounded-pill'>
        Hoàn tất
      </button>
    </div>
  )
}

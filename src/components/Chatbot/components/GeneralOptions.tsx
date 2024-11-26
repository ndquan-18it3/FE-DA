import { BotOption } from '../../../constants'
import { Options } from './index'
import './index.css'

export const GeneralOptions = (props: any) => {
  const options = [
    {
      name: 'Tư vấn và giải đáp',
      handler: props.actionProvider.handleQuestAction,
      id: BotOption.QUEST
    },
    {
      name: 'Đặt lịch phòng khám',
      handler: props.actionProvider.handleAppointmentScheduling,
      id: BotOption.SCHEDULE
    }
    // {
    //   name: 'Vấn đề khác',
    //   handler: props.actionProvider.handleOtherActions,
    //   id: BotOption.OTHER
    // }
  ]
  return <Options options={options} title='Options' {...props} />
}

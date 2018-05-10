export function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
export const schedule = [
  {
    no: 1,
    start: '08:00',
    end: '09:00'
  },
  {
    no: 2,
    start: '09:00',
    end: '10:00'
  },
  {
    no: 3,
    start: '10:00',
    end: '11:00'
  },
  {
    no: 4,
    start: '11:00',
    end: '12:00'
  },
  {
    no: 5,
    start: '12:00',
    end: '13:00'
  },
  {
    no: 6,
    start: '13:00',
    end: '14:00'
  },
  {
    no: 7,
    start: '14:00',
    end: '15:00'
  },
  {
    no: 8,
    start: '15:00',
    end: '16:00'
  },
  {
    no: 9,
    start: '16:00',
    end: '17:00'
  },
  {
    no: 10,
    start: '17:00',
    end: '18:00'
  },
  {
    no: 11,
    start: '18:00',
    end: '19:00'
  },
  {
    no: 12,
    start: '19:00',
    end: '20:00'
  },
  {
    no: 13,
    start: '20:00',
    end: '21:00'
  }
]
export const schoolSchedule = [
  {
    no: 1,
    start: '08:00',
    end: '08:45'
  },
  {
    no: 2,
    start: '08:55',
    end: '09:40'
  },
  {
    no: 3,
    start: '10:00',
    end: '10:45'
  },
  {
    no: 4,
    start: '10:55',
    end: '11:40'
  },
  {
    no: 5,
    start: '12:10',
    end: '12:55'
  },
  {
    no: 6,
    start: '13:05',
    end: '13:50'
  },
  {
    no: 7,
    start: '14:10',
    end: '14:55'
  },
  {
    no: 8,
    start: '15:05',
    end: '15:50'
  },
  {
    no: 9,
    start: '16:00',
    end: '16:45'
  },
  {
    no: 10,
    start: '16:55',
    end: '17:40'
  },
  {
    no: 11,
    start: '18:00',
    end: '18:45'
  },
  {
    no: 12,
    start: '18:55',
    end: '19:40'
  },
  {
    no: 13,
    start: '19:50',
    end: '20:35'
  }
]

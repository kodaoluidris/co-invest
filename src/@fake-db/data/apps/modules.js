import mock from '@/@fake-db/mock'

const data = [
  {
    id: 4987,
    issuedDate: '2019-12-13',
    client: {
      address: '7777 Mendez Plains',
      company: 'Hall-Robbins PLC',
      companyEmail: 'don85@johnson.com',
      country: 'USA',
      contact: '(616) 865-4180',
      name: 'Jordan Stevenson',
    },
    service: 'Software Development',
    total: 3428,
    avatar: '',
    invoiceStatus: 'Paid',
    balance: '$724',
    dueDate: '2019-04-23',
  },
  {
    id: 4988,
    issuedDate: '2019-07-17',
    client: {
      address: '04033 Wesley Wall Apt. 961',
      company: 'Mccann LLC and Sons',
      companyEmail: 'brenda49@taylor.info',
      country: 'Haiti',
      contact: '(226) 204-8287',
      name: 'Stephanie Burns',
    },
    service: 'UI/UX Design & Development',
    total: 5219,
    avatar: '1.png',
    invoiceStatus: 'Downloaded',
    balance: 0,
    dueDate: '2019-12-15',
  }
]

/* eslint-enable */

// ------------------------------------------------
// GET: Return Invoices
// ------------------------------------------------

mock.onGet('/apps/invoice/invoices').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', status = '', options = {} } = config.params

  // eslint-disable-next-line object-curly-newline
  const { sortBy = '', sortDesc = '', page, itemsPerPage } = options

  /* eslint-enable */

  const queryLowered = q.toLowerCase()

  let filteredData = data.filter(
    invoice =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      (invoice.client.companyEmail.toLowerCase().includes(queryLowered) ||
        invoice.client.name.toLowerCase().includes(queryLowered)) &&
      invoice.invoiceStatus === (status || invoice.invoiceStatus),
  )
  /* eslint-enable  */

  // sorting
  if (sortBy.length === 1 && sortDesc.length === 1) {
    filteredData = filteredData.sort((a, b) => {
      let sortA = ''
      let sortB = ''
      if (sortBy[0] === 'client') {
        sortA = a[sortBy[0]].name
        sortB = b[sortBy[0]].name
      } else {
        sortA = a[sortBy[0]]
        sortB = b[sortBy[0]]
      }

      if (sortDesc[0]) {
        if (sortA < sortB) return 1
        if (sortA > sortB) return -1

        return 0
      }

      if (sortA < sortB) return -1
      if (sortA > sortB) return 1

      return 0
    })
  }

  return [
    200,
    {
      filteredData:
        itemsPerPage !== -1 ? filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage) : filteredData,
      total: filteredData.length,
    },
  ]
})

// ------------------------------------------------
// GET: Return Single Invoice
// ------------------------------------------------
mock.onGet(/\/apps\/invoice\/invoices\/\d+/).reply(config => {
  // Get event id from URL
  let invoiceId = config.url.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  invoiceId = Number(invoiceId)

  const invoiceIndex = data.findIndex(e => e.id === invoiceId)
  const invoice = data[invoiceIndex]
  const responseData = {
    invoice,
    paymentDetails: {
      totalDue: '$12,110.55',
      bankName: 'American Bank',
      country: 'United States',
      iban: 'ETD95476213874685',
      swiftCode: 'BR91905',
    },
  }

  if (invoice) return [200, responseData]

  return [404]
})

// ------------------------------------------------
// GET: Return Clients
// ------------------------------------------------
mock.onGet('/apps/invoice/clients').reply(() => {
  const clients = data.map(invoice => invoice.client)

  return [200, clients.slice(0, 5)]
})

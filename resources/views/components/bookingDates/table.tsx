// interface TableProps {
//   dates: Array<{ batchId: string; dateAvailable: string }>
// }

// export const BookingTable = (props: TableProps) => {
//   const { dates } = props

//   return (
//     <div class="overflow-x-auto">
//       {dates.map((batch) => (
//         <div class="mb-4">
//           <h2 class="text-xl font-bold mb-2">Batch ID: {batch.batchId}</h2>
//           <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
//             <thead class="text-left">
//               <tr>
//                 <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//                   Date Available
//                 </th>
//                 {batch.dateAvailable.map((date: string) => (
//                   <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{date}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody class="divide-y divide-gray-200">
//               <tr>
//                 <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Toto</td>
//                 <td class="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
//                 <td class="whitespace-nowrap px-4 py-2 text-gray-700">Web Developer</td>
//                 <td class="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
//                 <td class="whitespace-nowrap px-4 py-2">
//                   <a
//                     href="#"
//                     class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
//                   >
//                     View
//                   </a>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   )
// }

interface GroupedDate {
  batchId: string
  dates: string[]
}

interface TableProps {
  dates: GroupedDate[]
}

export const BookingTable = ({ dates }: TableProps) => {
  return (
    <div class="overflow-x-auto">
      {dates.map((batch) => (
        <div class="mb-4">
          <h2 class="text-xl font-bold mb-2">Batch ID: {batch.batchId}</h2>
          <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead class="text-left">
              <tr>
                <tr>
                  {batch.dates.map((date) => (
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{date}</th>
                  ))}
                </tr>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr>
                <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Toto</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">Web Developer</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
                <td class="whitespace-nowrap px-4 py-2">
                  <a
                    href="#"
                    class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    View
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

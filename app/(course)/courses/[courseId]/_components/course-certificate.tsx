// import React, { useRef, useState } from "react";
// import ReactToPrint from 'react-to-print';
// import { PrinterIcon } from "lucide-react";




// export default function CourseCertificate() {
//     const [printableReport, setPrintableReport] = useState(false);
//     const componentRef = useRef(null);
//     const generateReport = () => {
//         setPrintableReport(true);
//     }

//     const selectedIds = {
//         eventId: 'event1',
//         vehicleId: 'vehicle1',
//         teamId: 'team1',
//         sessionIds: ['session1', 'session2']
//     };

//     return (
//         <div style={{ width: '100%' }}>
//             <h1>Title</h1>
//             {printableReport && (
//                 <>
//                     <ReactToPrint
//                         trigger={() =>
//                                 <PrinterIcon />
//                         }
//                         content={() => componentRef.current}
//                     />
//                 </>
//             )}
//         </div>
//     );
// }

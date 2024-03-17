function dinamicInput(msg) {
    const {leads,msgId,msgContent} = msg
    
    console.log(msgContent);
    
    if (!msgContent.includes("@")) {
     massege = leads.map((lead) => {
         return {lead:lead._id ,msgId ,msgContent:msgContent}
       })
       return  massege
     } else {
        const fields = Object.keys(leads[0]);
        console.log("fields,", fields[0]);
          
        let orderMsg = msgContent
        massege = leads.map((lead) => {
          fields.forEach(field=>{
            orderMsg = orderMsg.replaceAll(new RegExp("\\@" + field, "g"), lead[field]);
          })
          
          return {lead:lead._id, msgId ,content:orderMsg}
        });
     }
    //  console.log( massege);
     return  massege;
   }
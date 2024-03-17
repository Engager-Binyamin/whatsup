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
  
       massege = leads.map((lead) => {
         
        //  let namePattern = new RegExp("\\@" + fields[0], "g");
         let orderMsg = msgContent.replaceAll(new RegExp("\\@" + fields[0], "g"), lead[fields[0]]);
         let emailPattern = new RegExp("\\@" + fields[1], "g");
         orderMsg = orderMsg.replaceAll(emailPattern, lead.email);
         let phonePattern = new RegExp("\\@" + fields[2], "g");
         orderMsg = orderMsg.replaceAll(phonePattern, lead.phone);
         return {lead:lead._id, msgId ,content:orderMsg}
       });
     }
    //  console.log( massege);
     return  massege;
   }
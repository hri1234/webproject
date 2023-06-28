const db= require('./connection')
function indexmodel(){
    this.registration=(userDetails,cb)=>{
        userDetails.status=1
        userDetails.role='user'
        userDetails.dt=Date()
        userDetails.month='june'
        db.collection('hritik').insertOne
        (userDetails,(err,result)=>{
            err ? console.log(err) :cb(result)
        })
    }

    this.loginCheck=(userDetails,cb)=>{
        db.collection('hritik').find({"usn":userDetails.usn, "password":userDetails.password, 'status':1}).toArray((err,result)=>{
            if(err)
            {
                console.log(`error shown`)
            }
            else
            {
                cb(result)
            }
        })
    }

    this.massage=(userDetails,cb)=>{
        userDetails.dt= Date()
        userDetails.month= 'june'
        userDetails.role='user'
        userDetails.status=1
        db.collection('hritik').insertOne(
            userDetails,(err,result)=>{
                err ? console.log(err) : cb(result)
            }
        )
    };
}
module.exports= new indexmodel
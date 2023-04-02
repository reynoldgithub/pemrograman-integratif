import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType} from '../proto/user'
import { UserServiceHandlers } from '../proto/userPackage/UserService'
import path from 'path'
import { User } from '../proto/userPackage/User'
import { UserWithID } from '../proto/userPackage/UserWithID'
import { UserID } from '../proto/userPackage/UserID'

const PROTO_PATH : string = "../../../proto/user.proto"
const PORT : number = 5001

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
}

const protoBuf = protoLoader.loadSync(path.resolve(__dirname, PROTO_PATH), options)
const grpcObj = (grpc.loadPackageDefinition(protoBuf) as unknown) as ProtoGrpcType
const userService = grpcObj.userPackage

const client = new grpcObj.userPackage.UserService(
  `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
)

const deadline = new Date()
deadline.setSeconds(deadline.getSeconds() + 5)
client.waitForReady(deadline, (err) => {
  if(err) {
    console.error(err)
    return
  }
  onClientReady()
})

const onClientReady = () => {
  console.log(`Client running on port ${PORT}`)
  // client.GetAll(
  //   {},
  //   (err, res) => {
  //     if(err) {
  //       console.error(err)
  //       return
  //     }
  //     console.log(res)
  //   }
  // )
 

  // test create user
  // const user : User = {
  //   name : "Anaps",
  //   email : "anap@gmail.com",
  //   age : "24",
  //   password : "password"
  // }
  // client.createUser(user, 
  //   (err, res) => {
  //     if(err) {
  //       console.error(err)
  //       return
  //     }
  //     console.log(res)
  //   }
  // )


  // test update user
  // const user : UserWithID = {
  //   userId : {
  //     id : "6429a01cadd3919bfcde0148"
  //   },
  //   user : {
  //     name : "Anaps edited",
  //     email : "anap@gmail.com",
  //     age : "24",
  //     password : "password",
  //   }
  // }
  // client.updateUser(user, 
  //   (err, res) => {
  //     if(err) {
  //       console.error(err)
  //       return
  //     }
  //     console.log(res)
  //   }
  // )
  
  // test delete user
  const userId : UserID = {
    id : "6429a01cadd3919bfcde0148"
  }
  client.deleteUser(userId, 
    (err, res) => {
      if(err) {
        console.error(err)
        return
      }
      console.log(res)
    }
  )
}

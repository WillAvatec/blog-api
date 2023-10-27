# blog-api
This project is based on the jamstack architecture.<br>
The implementation is separated in two parts: Client and Server. <br>
## Implementation and Design
### Client
The **client** is going to request the data from the server fetching it from the API resources.
Since it's jamstack, the FrontEnd interface is agnostic about the server functionality, it only knows what the structure of the data is and from what enpoints to get them.
And accordinly present that information.

### Server
The **server** is going to respond by sending the data to the client in JSON format.
Depending on the method in the request of the endpoints, return the data and status.

### Database
The selected database follows the **Document Model**.
This project contains three main collections:
![image](https://github.com/WillAvatec/blog-api/assets/115133403/c5a40dd1-6b74-4b78-a7de-7d429362be7e)

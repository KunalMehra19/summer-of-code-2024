
document.addEventListener("DOMContentLoaded", () => {
var start=0;
var len;

    async function up(){
        var cat=0;
        var totalprod=0;
        var totalprice=0;
        let ad=await fetch("http://127.0.0.1:5000/products")
        dat=await ad.json();
        for (let i = 0; i < dat.length; i++) {
            e = dat[i];
            cat+=1;
            totalprod+=e[4];
            totalprice+=e[3]*e[4];
            
        }
        console.log(cat)
        console.log(totalprice)
        console.log(totalprod)

        document.getElementById("cate").innerHTML=cat
        document.getElementById("totalprod").innerHTML=totalprod
        document.getElementById("totalprice").innerHTML=totalprice


        

    }up();

    




    document.getElementById("pre").addEventListener("click",()=>{
        if(start>=6){
            start=start-6;
            gg();
        }
    });
    document.getElementById("nxt").addEventListener("click",()=>{
        if(len-start>6){
            start+=6;
            gg();
        }
    });

    

    async function getdata() {
        abc = await fetch("http://127.0.0.1:5000/products")
        data = await abc.json()
        return data
    }

    async function gg() {
        a = await getdata();
        len=a.length;
        console.log(a)
        document.getElementById("inventory1").innerHTML=""
        let lid=[];
        for (let i = 0; i < 6; i++) {
            try {
                const e = a[i+start];
                console.log(start)
                let temp = `
                <div class="border-bottom p-1 row" id="${e[0]}row">
                                <div class="col d-flex justify-content-center">${e[0]}</div>
                                <div class="col d-flex justify-content-center ">${e[1]}</div>
                                <div class="col d-flex justify-content-center text-truncate">${e[2]}</div>
                                <div class="col d-flex justify-content-center">${e[3]}</div>
                                <div class="col d-flex justify-content-center">${e[4]}</div>
                                <div class="col d-flex justify-content-center">
                                    <div class="d-flex gap-3"><svg xmlns="http://www.w3.org/2000/svg" id="${e[0]}upd"  data-bs-toggle="modal" data-bs-target="#${e[0]}modal" viewBox="0 0 24 24"
                                            width="24" height="24" color="#1d7eef" fill="none">
                                            <path
                                                d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591"
                                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round"></path>
                                            <path
                                                d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3"
                                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                        </svg><svg xmlns="http://www.w3.org/2000/svg" id="${e[0]}dlt" viewBox="0 0 24 24" width="24"
                                            height="24" color="#d0021b" fill="none">
                                            <path
                                                d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                            <path
                                                d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                            <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5"
                                                stroke-linecap="round"></path>
                                            <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5"
                                                stroke-linecap="round"></path>
                                        </svg></div>
                                </div>
                            </div>

                            <div class="modal fade" id="${e[0]}modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Updating Product</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="d-flex justify-content-between mt-1"><div>Item Name</div>
                                        <input type="text" id="${e[0]}itemname"></div>
                                        <div class="d-flex justify-content-between mt-1"><div>Item description</div>
                                        <input type="text" id="${e[0]}itemdescription"></div>
                                        <div class="d-flex justify-content-between mt-1"><div>Item Price</div>
                                        <input type="number" id="${e[0]}itemprice"></div>
                                        <div class="d-flex justify-content-between mt-1"><div>Item Quantity</div>
                                        <input type="number" id="${e[0]}itemqty"></div>
                                    </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" id="${e[0]}addprod" >Save changes</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                
                
                `
                document.getElementById("inventory1").innerHTML = document.getElementById("inventory1").innerHTML + temp

                lid.push(e[0]);

            }
            catch {
                console.log("nhi hua")
            }

        }
                console.log(lid)
                lid.forEach(pp => {

                    document.getElementById(`${pp}addprod`).addEventListener("click",()=>{
                        isnm=document.getElementById(`${pp}itemname`).value
                        isdes=document.getElementById(`${pp}itemdescription`).value
                        ispr=document.getElementById(`${pp}itemprice`).value
                        isqt=document.getElementById(`${pp}itemqty`).value


                        fetch(`http://127.0.0.1:5000/products/${pp}`, {
                            method: "PUT",
                            body: JSON.stringify({
                                "item_name": isnm,
                                "item_description": isdes,
                                "item_price": ispr,
                                "item_qty": isqt
                            }),
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then(response => {
                            if (!response.ok) {
                                throw new Error("Failed to add product: " + response.status);
                            }
                            return response.json();
                        }).then(data => {
                            console.log("Product added successfully:", data);
                            // Close the modal
                            alert(data['message']);
                            if(data['message'] && data['message'].includes('updated')){
                                modal=document.getElementById(`${pp}modal`);
                                modal.classList.remove('show');
                                modal.style.display = 'none';
                                modal.removeAttribute('aria-modal');
                                modal.removeAttribute('role');
                                document.getElementsByTagName("body")[0].removeChild(document.getElementsByClassName("modal-backdrop")[0])
                                // Optionally, you can reload or update your data here
                                // For example, call a function to refresh your inventory
                                // fetchAndUpdateInventory();
            
                            }
                           
                            gg();
                            up();
                        })




                    })


                    
                    document.getElementById(`${pp}dlt`).addEventListener("click",()=>{

                        console.log("delete kar raha")
                        let userConfirmed = confirm("Are you sure you want to proceed?");
                        if(userConfirmed){
                            
                            
                            fetch(`http://127.0.0.1:5000/products/${pp}`, {
                                method: "DELETE",
                            }).then(response => {
                                if (!response.ok) {
                                    throw new Error("Failed to add product: " + response.status);
                                }
                                return response.json();
                            })
                            .then(data => {
                                console.log("Product added successfully:", data);
                                // Close the modal
                                alert(data['message']);
                                up();
                            })
                            document.getElementById(`${pp}row`).remove();
                            
    
                            
    
                        }
                    })
                });
    }gg();


    

    document.getElementById("sss").addEventListener("click", () => {
        
    });
        document.getElementById("addprod").addEventListener("click", () => {
            let isku = document.getElementById("itemsku").value;
            let isnm = document.getElementById("itemname").value;
            let isdes = document.getElementById("itemdescription").value;
            let ispr = document.getElementById("itemprice").value;
            let isqt = document.getElementById("itemqty").value;

            console.log(isku, isnm, isdes, ispr, isqt);

            fetch("http://127.0.0.1:5000/products", {
                method: "POST",
                body: JSON.stringify({
                    "item_sku": isku,
                    "item_name": isnm,
                    "item_description": isdes,
                    "item_price": ispr,
                    "item_qty": isqt
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(response => {
                if (!response.ok) {
                    throw new Error("Failed to add product: " + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log("Product added successfully:", data);
                // Close the modal
                alert(data['message']);
                if(data['message'] && data['message'].includes('added')){
                    modal=document.getElementById("exampleModal");
                    modal.classList.remove('show');
                    modal.style.display = 'none';
                    modal.removeAttribute('aria-modal');
                    modal.removeAttribute('role');
                    document.getElementsByTagName("body")[0].removeChild(document.getElementsByClassName("modal-backdrop")[0])
                    // Optionally, you can reload or update your data here
                    // For example, call a function to refresh your inventory
                    // fetchAndUpdateInventory();

                }
               
                gg();
                up();

            })
            .catch(error => {
                console.error("Error adding product:", error);
            });
        });
    
});




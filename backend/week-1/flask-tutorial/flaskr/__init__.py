import os
from flask import Flask,request
from flask_restful import Resource, Api
from flask_cors import CORS
from .db import get_db

def create_app(test_config=None):

    app = Flask(__name__, instance_relative_config=True)
    api=Api(app)
    CORS(app) 
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE_HOST='localhost',
        DATABASE_NAME='mydatabase',
        DATABASE_USER='postgres',
        DATABASE_PASSWORD='kunal@191105',
        DATABASE_PORT=5432,
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    class HelloWorld(Resource):
        def get(self):
            return 'Hello'

    api.add_resource(HelloWorld, '/')

    from . import db
    db.init_app(app)


    class register(Resource):
        def post(self):
            conn=get_db()
            curr=conn.cursor()
            curr.execute('''SELECT * FROM staff''')

            alldata=curr.fetchall()
            
            data = request.get_json()
            name = data.get('name')
            email = data.get('email')
            isAdmin = data.get('isAdmin')
            contact = data.get('contact')
            pwd = data.get('pwd')
            register_values=(name,email,isAdmin,contact,pwd)

            if not name or not email or not contact:
                return {"message": "Name, email, and contact are required"}, 400
            
            for i in alldata:
                if i[2]==email:
                    curr.close()
                    conn.close()
                    return {"message": "email is already occupied"}, 400
                if str(i[4])==contact:
                    curr.close()
                    conn.close()
                    return {"message": "mobile number is already occupied"}, 400
            
            curr.execute('''INSERT INTO staff (s_name,s_email,s_isAdmin,s_contact,pwd) VALUES(%s,%s,%s,%s,%s)''',register_values)            
            conn.commit()
            curr.close()
            conn.close()
            return {"message":f"ho gaya register ab login karo {register_values[0]}"}

    api.add_resource(register, '/register')

    
    class login(Resource):
        def post(self):
            conn=get_db()
            curr=conn.cursor()
            curr.execute('''SELECT * FROM staff''')

            alldata=curr.fetchall()

            data = request.get_json()
            email = data.get('email')
            isAdmin = data.get('isAdmin')
            pwd = data.get('pwd')
            curr.close()
            conn.close()
            for i in alldata:
                if i[2]==email:
                    if i[3]==isAdmin:
                        if i[5]==pwd:
                            curr.close()
                            conn.close()
                            return {"message": f"{i[1]} login in successfully!"}, 200
                        else:
                            curr.close()
                            conn.close()
                            return {"message": "You have entered wrong password"}, 400
            
                    
            curr.close()
            conn.close()
            return {"message": "incorrect information"}, 400
    api.add_resource(login,'/login')


    class GetAllAndCreate(Resource):
        def get(self):
            conn=get_db()
            curr=conn.cursor()
            curr.execute('''SELECT * FROM InventoryItem''')

            alldata=curr.fetchall()

            curr.close()
            conn.close()
            return alldata
        
        
        def post(self):
            conn=get_db()
            curr=conn.cursor()
            curr.execute('''SELECT * FROM InventoryItem''')

            alldata=curr.fetchall()

            data = request.get_json()
            item_sku = data.get('item_sku')
            item_name = data.get('item_name')
            item_description = data.get('item_description')
            item_price = data.get('item_price')
            item_qty = data.get('item_qty')
            register_values=(item_sku,item_name,item_description,item_price,item_qty)

            for i in alldata:
                if i[0]==item_sku:
                    curr.close()
                    conn.close()
                    return {"message": "Item already exists please update existing item"}, 200
                
            curr.execute('''INSERT INTO InventoryItem (item_sku,item_name,item_description,item_price,item_qty) VALUES(%s,%s,%s,%s,%s)''',register_values)            
            conn.commit()
            curr.close()
            conn.close()
            return {"message": "item has been added"}, 200

    api.add_resource(GetAllAndCreate,"/products")


    class GetOneUpdateAndDelete(Resource):
        def get(self, item_sku):
            conn=get_db()
            curr=conn.cursor()
            curr.execute('''SELECT * FROM InventoryItem''')

            alldata=curr.fetchall()

            for i in alldata:
                if i[0]==item_sku:
                    return i
                
            return {"message": "item is not present in database"}, 400
        
        def put(self, item_sku):
            conn=get_db()
            curr=conn.cursor()
            curr.execute('''SELECT * FROM InventoryItem''')

            alldata=curr.fetchall()

            data = request.get_json()
            item_name = data.get('item_name')
            item_description = data.get('item_description')
            item_price = data.get('item_price')
            item_qty = data.get('item_qty')
            for i in alldata:
                if i[0]==item_sku:

                    curr.execute('''UPDATE InventoryItem SET item_name=%s, item_description=%s, item_price=%s, item_qty=%s WHERE item_sku=%s''', (item_name, item_description, item_price, item_qty, item_sku))
                    conn.commit()
                    curr.close()
                    conn.close()
                    return {"message": "item is updated"}, 200
            curr.close()
            conn.close()
            return {"message": "item is not present in database"}, 400
        

        def delete(self, item_sku):
            conn=get_db()
            curr=conn.cursor()
            curr.execute('''SELECT * FROM InventoryItem''')

            alldata=curr.fetchall()
            for i in alldata:
                if i[0]==item_sku:
                    curr.execute('''DELETE FROM InventoryItem WHERE item_sku=%s''', (item_sku,))
                    conn.commit()
                    curr.close()
                    conn.close()
                    return {"message": "item is deleted"}, 200
            curr.close()
            conn.close()
            return {"message": "item is not present in database"}, 400 


        
    api.add_resource(GetOneUpdateAndDelete,"/products/<item_sku>")

    return app

if __name__ == '__main__':
    app = create_app()
    app.run()

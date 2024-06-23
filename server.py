from http.server import SimpleHTTPRequestHandler, HTTPServer

class CustomHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = 'index.html'
        elif self.path == '/login':
            self.path = 'login.html'
        elif self.path == '/search_page':
            self.path = 'search_page.html'
        elif self.path == '/seller':
            self.path = 'seller.html'
        elif self.path == '/seller':
            self.path = 'seller.html'
        elif self.path == '/buyer':
            self.path = 'buyer.html'
        elif self.path == '/buyer_profile':
            self.path = 'buyer_profile.html'
        elif self.path == '/seller_profile':
            self.path = 'seller_profile.html'
        return SimpleHTTPRequestHandler.do_GET(self)

PORT = 3000

with HTTPServer(('localhost', PORT), CustomHandler) as httpd:
    print("Serving on port", PORT)
    httpd.serve_forever()

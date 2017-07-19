var config = {
"mediaQuery": "(max-width: 324px)",
"metaViewportAttrs": {
  "name": "viewport",
  "content": "width=device-width, initial-scale=1.0"
},
"overlayStyle": {
  "width": "100%",
  "height": "100%",
  "backgroundColor": "rgba(0,0,0,.1)",
  "position": "absolute",
  "top": 0,
  "left": 0,
  "zIndex": 3999
},
"circleStyle": {
  "backgroundColor": "#df795e",
  "backgroundImage": "url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSI0OTZweCIgaGVpZ2h0PSI0OTZweCIgdmlld0JveD0iMCAwIDQ5NiA0OTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+QXJ0Ym9hcmQ8L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGRlZnM+ICAgICAgICA8Y2lyY2xlIGlkPSJwYXRoLTEiIGN4PSIyNDgiIGN5PSIyNDgiIHI9IjIzOSI+PC9jaXJjbGU+ICAgICAgICA8bWFzayBpZD0ibWFzay0yIiBtYXNrQ29udGVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgbWFza1VuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeD0iMCIgeT0iMCIgd2lkdGg9IjQ3OCIgaGVpZ2h0PSI0NzgiIGZpbGw9IndoaXRlIj4gICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPiAgICAgICAgPC9tYXNrPiAgICA8L2RlZnM+ICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIj4gICAgICAgICAgICA8cGF0aCBkPSJNMzA1Ljg1NzIwMyw0OC43NjU3NjEyIEwzMTAuMTg1NzYyLDU3LjU1OTE2OTcgTDMxOS44NjQwNyw1OC45Njk4OTc1IEwzMTIuODYwNjM3LDY1LjgxNTE5NDcgTDMxNC41MTM1NTQsNzUuNDgxMTc4NyBMMzA1Ljg1NzIwMyw3MC45MTY4Nzg1IEwyOTcuMjAwODUyLDc1LjQ4MTE3ODcgTDI5OC44NTM3Nyw2NS44MTUxOTQ3IEwyOTEuODUwMzM2LDU4Ljk2OTg5NzUgTDMwMS41Mjg2NDQsNTcuNTU5MTY5NyBMMzA1Ljg1NzIwMyw0OC43NjU3NjEyIFogTTE4OS44NTcyMDMsNDguNzY1NzYxMiBMMTk0LjE4NTc2Miw1Ny41NTkxNjk3IEwyMDMuODY0MDcsNTguOTY5ODk3NSBMMTk2Ljg2MDYzNyw2NS44MTUxOTQ3IEwxOTguNTEzNTU0LDc1LjQ4MTE3ODcgTDE4OS44NTcyMDMsNzAuOTE2ODc4NSBMMTgxLjIwMDg1Miw3NS40ODExNzg3IEwxODIuODUzNzcsNjUuODE1MTk0NyBMMTc1Ljg1MDMzNiw1OC45Njk4OTc1IEwxODUuNTI4NjQ0LDU3LjU1OTE2OTcgTDE4OS44NTcyMDMsNDguNzY1NzYxMiBaIE0yNDksMzAuOTkyNTkzNSBMMjU0Ljk0MzE1OCw0My4wNjYwMzggTDI2OC4yMzE1NzksNDUuMDAyOTgyNCBMMjU4LjYxNTc4OSw1NC40MDE2NDkxIEwyNjAuODg1MjYzLDY3LjY3MzE0OTEgTDI0OSw2MS40MDYzMTU3IEwyMzcuMTE0NzM3LDY3LjY3MzE0OTEgTDIzOS4zODQyMTEsNTQuNDAxNjQ5MSBMMjI5Ljc2ODQyMSw0NS4wMDI5ODI0IEwyNDMuMDU2ODQyLDQzLjA2NjAzOCBMMjQ5LDMwLjk5MjU5MzUgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiBmaWxsLW9wYWNpdHk9IjAuMjQiIGZpbGw9IiM5NzBFMDYiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPiAgICAgICAgICAgIDx1c2UgaWQ9Ik92YWwiIHN0cm9rZT0iI0ZGRkZGRiIgbWFzaz0idXJsKCNtYXNrLTIpIiBzdHJva2Utd2lkdGg9IjgiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+)",
  "backgroundRepeat": "no-repeat",
  "backgroundSize": "100% 100%",
  "width": "496px",
  "height": "496px",
  "maxWidth": "100vw",
  "maxHeight": "100vw",
  "color": "white",
  "borderRadius": "50%",
  "margin": "40px auto 0",
  "position": "relative"
},
"headerStyle": {
  "fontFamily": "'Helvetica Neue', Arial, sans-serif",
  "direction": "rtl",
  "fontWeight": "bold",
  "fontSize": "26px",
  "color": "white",
  "textAlign": "center",
  "position": "absolute",
  "top": "18%",
  "left": "10%",
  "width": "80%",
  "margin": "0 auto"
},
"headerReducedStyle": {
  "fontSize": "22px"
},
"headerText": "רוצה לקבל ממנ עדכון<br>כל פעם שיש משהו חדש?",
"formAttrs": {
  "method": "post",
  "action": "test.html"
},
"inputWrapperStyle": {
  "position": "absolute",
  "top": "38%",
  "left": "14.5%",
  "width": "71%",
  "height": "10%",
},
"inputAttrs": {
  "type": "text",
  "placeholder": "מייל:"
},
"inputStyle": {
  "width": "100%",
  "height": "100%",
  "direction": "rtl",
  "fontSize": "22px",
  "border": 0,
  "backgroundColor": "white",
  "borderRadius": "10px",
  "lineHeight": "36px",
  "padding": "0 16px",
  "boxSizing": "border-box",
  "cursor": "move"
},
"submitAttrs": {
  "type": "submit",
  "value": "להרשמה"
},
"submitWrapperStyle": {
  "position": "absolute",
  "top": "55%",
  "left": "14.5%",
  "width": "71%",
  "height": "13.1%",
},
"submitStyle": {
  "width": "100%",
  "height": "100%",
  "border": 0,
  "fontSize": "34px",
  "fontWeight": "bold",
  "borderRadius": "10px",
  "backgroundColor": "#414042",
  "color": "white",
  "textAlign": "center",
  "cursor": "move"
},
"submitReducedStyle": {
  "fontSize": "24px"
},
"footerStyle": {
  "position": "absolute",
  "top": "74%",
  "left": "10%",
  "fontSize": "13px",
  "width": "80%",
  "textAlign": "center",
  "color": "white"
},
"footerReducedStyle": {
  "fontSize": "11px"
},
"footerText": "(ניתן להסיר את המייל מרשימת התפוצה בכל עת)",
"closerStyle": {
  "position": "absolute",
  "width": "24px",
  "height": "24px",
  "borderRadius": "50%",
  "top": "0",
  "right": "0",
  "border": "2px solid white",
  "backgroundColor": "black",
  "color": "white",
  "fontSize": "22px",
  "lineHeight": "23px",
  "textAlign": "center",
  "cursor": "pointer"
  }
}

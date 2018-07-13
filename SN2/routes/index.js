var express = require('express');
var router = express.Router();
var proxy = require('./proxy.js');

/* GET home page. */


/*Proxy methods...*/

var default_name = "Please Log In";
var default_url = "https://s-media-cache-ak0.pinimg.com/564x/0d/48/81/0d48815b58470dead2395bfd2c242f72.jpg";
var default_url2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEX///8AAAD5+fnz8/Pi4uL8/Pzf39/Ozs7V1dXy8vLu7u729vbY2Ni4uLjq6urKysqysrKGhobDw8O+vr6srKx5eXlvb2+FhYWnp6dxcXGNjY1PT09cXFyYmJigoKCUlJRHR0c1NTVUVFRmZmZ9fX08PDwgICAxMTEWFhYODg4nJydCQkJKSkoyMjIcHBwPgZ5KAAAdMUlEQVR4nO1dB5eiTLPuRpJKkiCIgAGz7vz/n3e7OpBsnHHfgZm956uzZ3cVFYqurnoqgtD/6H/0P/of/fNklkfzp69hSHIyTCge4UzaCOeQUIAZHWeDn0qPpoOf45k2uCJ18JNZ5CzZ0h/8PE064Abpg59OyRSEQm/w89QU4xY5w58xJ+cIh98QgsI2g3g3gi5ILKQZw5+GkYW7FI1wVj8YTalqH08cYneE8+r2CCehFD0ziC8jnNfD6QhnIWRKGMQ4HPy8GsanwU9C6Sjl8GPw86rEJg5+EqBAyiDGw9vjbAT4BHTr4XCc+zsC+T0MYvwT2HEIWvdyGPz0pX0P6b0M4sNPX9v3UNzP4e2nr+1bSLu0tYuvoUkuXo2Av4entp5hBmJm75ov/3FaNaWSWycnUBkI2PzstX0PNRlU+HuO7aj0nf2PXtr3UAOSXifiTdVTORj/yUv7JmoEZ6zqTeCQsT558dV/hO4Vg0n9pmmrXHyt/m/+K1QxuG686bs6Qg94dww3eFiqt2ED5GuUw2VnYT+n8aJKb1AiGMwbbyo1h2+54L9SL4nwRStk4Riuyjl8C5lmI4Uk3qIH57AVsTB9l1hGmsN4K+Lm4mj+vZf3DcQZbAcsXBfcphMcWL71ax9ErJXPPzYmzTmHRfPNmW8QFarQA+VbP5ecfh3SE4HgljNvGT5RNMZfcDg7IM1cHX/TMnLHog0/fdckiqb4Cw5RBBioePNLg5ItEVLdMGAb7umR1Xu/Z1D7ef5FhpHnY1hi22LeoO+65PWEHXk3e0GXr/hFbiV35vmrLWTzLMMw1Gp13814h5BLct9CQsNSStl48FdBudSRQTUps4bvK0YFFt0aM+/5CcXthfJR7humSxyKGVeyb19rpIAYfO9V/hdiHFYpLhupueECoCk4h29fq0oA7m9yuRYNRUNo4vqhCXoGXTmH7+fz30NBg9OmY+8LsoKG1gjAvf+T4S8SUSSEsXoZnGzDABnbcgbfDglvPt41oQOTB2zsxCuduIlUkVZ+8bvmEFIg198A2lQhl3bTf5iGODMNOLQXHL5p2KhI/PnGC/1rUgRydOGSuN86IXjUMkFGDcHgu4rm468MzCCUfrDroHFfFsBQbrFlGhRviV2IL2/Wgtzwm3GP4Wjmm/RKNOCD+veTFAem68MeqpPe7zoJehn9Gk3qIZNaQZAr8CRmRrAyfWMm3vtLRPOLyHTmNMEL8NOFYsiVk/gWBSNpxSD+RV7Q+2RrNDcYUWTmmpe16YZ0VdWawfXrn/jllLCoGOh3M1CDU+CqIeV5V3MoLxly/o3s/olXIYC52DiBnviqj+CtZs5bEhrMXWT/Eyk3VySwQSYLw7R8m7B3dITji5tIoElrHxVj1IH/d7JFhh6E0VdtJ3FQlLQL3GRF+zsdpb/Ig5eS0ZS9qU2M9HJqExH1w7KpZTA+y759IzciH75E+j/RdF8DFdefHQm8hj1IBBA5TQaxrPTTuhz2118W832mgwgeasnMt4iHuNcZEGmXDsnKS4t/AwjoM5UiNsPTwkkA0TbWe9CpUJSxEeNr6uIf6gZ5gzzkq2geqpY9DeeFgC55m0HpLlTMI9FNv8H/e03GdG6anuKpVjANYe8F4E+1Gewp2gsyNLv+/jVEvpKqaog8nbAIyrRE1qnD4Fb+TWILrZ380G+i2cJDnjEtCItmgGDxNrhLPQZhUyDj99fVEqPnF8j3lUKxraf9x6gPthxyI8LHUS/3ffJX+OqiwrFsrYCYjC1hsGerzbc0jPq7xXSWO7NI0xPkWQ5DX6qEw54qGsinHs/R8I1tXyejHV9XXdtDto0SU8s1n2tL45nBvgIM1SZ4ffWbnKd5O6JLMIsyyaezHBkhSvhKOM8MvpBCPEHr31QmtcZWM7ub4cj1UBCgxJrk3GzPL88cNqRQay+Y86GhEVoTv0wFJk5tJadOcT8tVCV3prliCEg22T0z2ETcSTtxYRGZyH4PpLHwgvwtwpd2iMIUmQUiy5gIz8/pGvquocja+HsyWqvZV0i70v00pRpznqooN+3QQIWFNiKmL1EynT6Z3W+OWJQ8Fgilom6O1FSbpcF0g+qt2W0bBWpbc6VKgPfRT2LUo1ASOcoNRMyEH6K8QHalO1IJg7d2TbDzWQIxLF4fH5R0wYqZzdFGRwVIqFcITagtJQx2Q8D+J2lu5Wc7owp29sBbmAs0j+dKOlEOotJFl+iY5waS8JOSoXT7/Zf9DoEqRRszJtrDyJGVI5PYenYokfF3feqQOUi4bpAzSjv0C9JtNImnBHfGXgBgzRNy++TuUjo98wIp3RdMLH+8QzE0UqTtiYIEU4FyYfxVaUflTrKlznCgF2hbh1G6oV9RsEZOmuOThhYzFAstIm+olGVhpvRI7zqVRIqHufCvUhI4Odl85Xx+QNMKqhRSBqWLAY7VTh77RqDCyC34UU9qY0LgyCiQniK9CuLKOu+BZM0xEF+Mln1JNljb/U86GgsVJfE184BHszLMWQ+DZDGU6Uw1Ddcw1dmUoevivsXY38u9CVoZFP0gh4cZgTI3cv+DsK6G1O4y5naAbh73a/O9e7YJZisX6beLKo3aKDQztf85V2o5QaluYpwHNmwYRpp0skDGMk7reBMGhknI9/JFSfnNChWd0limT2h6Zv5zmmaloIUO2c5N0DCDOxmDG6ZRnssu9OAKX8iw1wJziu9BdSZd17JRDOyNGt2IYAVRYWfkEqozy0WUHoX/PP/KbIfmAYGv12YAnAautigG65k3amfS25hlDWQPbiyU+BCxqH2JvYS/G9P2AAGe/SCTOocaBFSzymKwptot7Oy8kSpdPcb0o2IVHAmPbkC/SiHJfAkRkYBjz1bPo8AWAlgLook4omXh8RPh3G2gvMeoVaUEoBHJJN4gMRNGZSaeA/eNJgRYpucAxYLdnQlIsH3Ca6Y3KaZt+1STj1FLvQjEJnxZG+LVg63nJBlfcq1XDeLeC6Q5qmX4vmvqrHaxZHw4DLfZH3hFE+S6HbThgTpuypSw5izQNEKTA/Es6ot4ltBGPh+yv6dd8+jlHttXhsVdwUAhz3wb7xeDv012fbHziFZaE7810tCq2v3nfgkFopX5j7jwXEtVdWIQiwNVvBkMGysqNTvLcPaE7uwxsKn5ka3K4599Spiag6lYOPCn8ibaw+YodfQKKNPurxrn9ELAjfdoqEz7KaeRX8cJZKR4ScywlaVEy/jiT3Utbpe/Y3clwNXtQkyDyMIseWD604Im+3YB6fL+3az0kZXCgqkn0C8O/aNXnb1aN3L/rNqhK6FbxcbjaGV6xdvGTstxI+q9HtFKaDnRAqupX+/D6lB3PItEtUPotP6C6YWuhiIKyWyytB5B8PU6+tX4jPl53IJgKyVILbUgqg2BbbL/mUnuTtjJJd+F6LdwAwu65Fc3Aw0yY0bQvtIWX6bRVB7ZcN4tdP/P5KztqRBQK0F2yQLYHbQmvSpQpsTNd0zDrz3I1ieIqQDPZA2yPL+By2iNP9tlRS50BgK6ghiKx1tD3S8wiBSofO6GUNUW1KxyAMDXEev++Gk23wZh21AlWujzhcNSnW2fsC8KD13rxzgM2mGqMqiVyr35G9oa38YPd5eUmy1oGgJmEqP0YQ3b+aXemrsVX95G+WXhxsQNjsRKNXwvF7TXaXQOPYPCywhtiLmfouieIliw1i7sD9FDEByc4DrpTRPkFtHDD7f6BKcjyrLpdaSJhzWR61vuCOpXDsjJIaYWt68Yv5wYBNJJS9kE/KkCxMRUsAHYVZ8Jvp4XoJxGzi2SzReaFjHbZAnjCY0agnwtGgyeX+Sn6Z2gTBWgcHZNhRSc8JIcUurJdfSoMXJ7zJL+idD8APaCbBSHGq/m5NWXCBk+wLfc1OmCOu5VJDwcF4h3xzQXbkBDFi7M5k3riElTz7x24kDl2kh1Ay8kGtXslOkTrwLwmeZuVtGmQn2ZrJr/2+mWAnKZlKYTsb3Y6lNtOBWf9DCBMm3h1zJvlRt5+CRkwBcAbz7OVuRh+scdp2aCXBuUakWNLNPrIpGJNCW8aBh19VZ5H54wq+6TS6wPkfY2z/i4U9FmFpKddlCaS9hw7V/WiZjShCK9cbVPpWTVj6TCrY86chq/Oe7lq5TmByqb5Vo7oFlDw9XVFq9amJzeZAbQvRaJqPKw1jyTo7Vq4PSzFNZ/BwUn3QqJttHPBqiaxiUJetEiL0+3Naic17/H1ZUisophA50WAw5XXsw3uxmYwazdD19twxdqRhYobtG1IeIHXFU0cmbOQtk42yHH8oKELk1wfifThpDOq6vsXULlz2cMEvz2qL3jpVizGItIHJNi2hU+mLeh5kgtUFoS5xz5DStc+b69wRR5NqpL5xjfBQi4c92iXblcbKFsak5V1WcFVH9PZOslOkr8aDkjKrV+v7L3vb74Sx1T08m7XvnvToQoBjxe5xIB4T7XcIHhkkVHiZeXtrahJ66wLy30qZKpyLiJwhpDGMMtr4E7ltE6pP7zYGMkYSYMdestIlCLxgFRht/n58hKvPvIOYv7tMEGZUXnsLQAlu84HhDgkG1IoAT5e4fbAilq8/p6C55l9FhupeVg5Mj840ajGi4o6BIQXEZjCIsHcHg45wMKaWgC5A5cuiRNj0a4Tj14pv1MiwiceCLvmmOvsIQWU7pIwuEMIB7gIvW8QQsiI1F0GLCKj/gSxKlPpzTm1FxDESjtsRUNRq7JnObfROW7L1FBlgmLVe1t8qP3fXjVQVwttA5OAwaHyY1faeRvenubSkWsoVzRaPXFU+tNr71SFs5T4c2R7Gu9bkDZQhaDYbbLQsP2gKE3jWoZ+LPtmCS+D6/y71VhNY7KqNA2/BL10WHRR8c/vBIMCHnHK4Ohm/NhOeT8dmcDqlSjiEZriQrP+/aM0REyLOR6Vq2moI4xeRDlm9R9UvsI8ToUgiwuQzZDWQnoUeUAOVHUAqCJEC8pcUBaqyFIMrajcZ3n6zhE7udC9q8u6Bq6xYl8b4csVLB9ZHg04bTpzKHicij3nPjDcxqaCVju4Ltpy+0viE9BdLUBaohlX+HlNHsBC/8LGYXBUEauosCHiYVkJeetele+BHJLzGB50xug27aDSybNWrA1CK7Cvsx2YHkMM5wFySC1UdrUCNO48Jx4Ci0iQQBmf9Yy7s6rNZxzwauJKtNuQK6VuQLHkGG2lOGkALszBcDRcIp0rvqPNM08zTOAQ2fROsoWYCv/JhxqLbnZ3pacvAaHZNfFrBLVYrdCYchtPuyzPohyOCSQmTeTLocsTC3vRaMcmk/vPGc2GsbfhuVi+IGv5YWd8D5ocJioz0MMNoFwOGtbJWYQ5U81gtz3RzsAd8YyH6+RGIA9cGMboWS7+7Cl/ywHLWkH3wkAiEnMxqRdWR+I7SOj9RM7sFoSeFCjG7BFG7YDPfarIdM8xaBlmOT2RWD5POLnty2+mGApb5mIn0oWFvIP18oGcjcm+wRXLhaDhMHQHC5hC/kwdrIjLUehICTkP/VSUMwpKXCq643gFVNGClMuDtvK5qAPUchAUPXzHkk4TIWCkNFTPpEqU0nEs0ZvwMfjQGsguHJhXuFs0JQ35RDZBlWkHQ5ZSnch/2L6hAXgwxInqAZvwEf24U1j7K/YBz+oTtWGrG1z8M2NNBTYaApORicbRD32nkmG06fxHh9yVVP7WSCSHi6JGi7SO60+efClHDDRtvi4QdugS9QM2I2Oo81gck9WZtNVKzQmKMHQ1UaEldIJ+qbOs4/yix2xpRzS5JePOShAKCUlIrrpaBUWbOo7/aUThU+fUAA/R3sNVXLjvADv8QkvcrYvrgOWmMZn4iUFFHOXWt15IGjbs7coqR24Q+2nJPdQtZsCVCMad/3AnoWZi3mGmbXoY8DHQfpEwREHGzo8Dg50GUouujd56LcVBFUpkna8yuuluxx7xhafluRFgtP8ugXXaUgO0SlG+xIGWUE525waAKXBEfXwemWoreSpStk+f6rikP1iSBY1TvG1LHGabBGc7DJkIfQCJ2tiD/aOEcfh5rTMCDXuKM0hftVD/ajYaJEog2fRghPxmi1dxar9wH/WDPkN6lxs7Pv5vFqdF4lXmmr5hLouPUhFRkth9NokkOmWvjrRuICJaa1pxgaFDFqWURhUi+YW0sg/yVM3GXXwvhhxz+UQaN3ikO05A9bacOPlLBjY4iM/oZsQekfIP/ozgDl+fRF9OQQSVTnsPrFb4DNpzuinlUEffQXT15YT5BAdsyDr+OzgmfUW+vS3pOsthuyzVLLCajJsxuG5YN8bsutpWtJ+UUS0iU9Ot3oufYpeqtMmzSHu8dG1LVUekipqhwUwcqa92O+6w7bpkXtOMBuFpCCtEueAXt6X/Bsq0V1lVXUUUQyqs+Mryu6cib83LIdEfc5KaGwmzJLbL5FHmrP5UqAhkoE8XvBw3/ENCCDG3NE7qTPxXAxbHAXKlCyeSsBISK4hkmx6CsC/Uq5Ew+QdKRCJVJtB1hxuYQYZRQTsUpHe9zho30QwmjsmRmwLDR/kgmQo9NGDqbvkSlQNF9KdxUSxPHCrQqM2bDeehu3tUtaItuEtCAcZEZq7JFXJYtefKzyqNjtZcb6EbsjeB2PB3iF3NaPBvenQz0ksw2x1VpEeIc3bEMmRiQwVtdOn+RPl9KRqQmELmSiq4KqxtwqB1oae+Fngh4NKsj4ZyFMoX0Sm8o+fXgnNSDVxkcb1jKNwtflRmY9S2MHNsIMGM7wkN9cukL6j542QL81WUj/q/tmkrriragqxXgLEHCoOMxSyGP9x0Lm7i/segSP7yFOeTTPQWhohpSyePzGLXoVdGM0qvFayyBysJA+DL1FGncnJoKh0hmMDpS45qS0iRjFS5d6SIfTDC2LRufo1S3XfNKJNqCpmYI2lFUPE5NkfdCzt4rCbEgMRRuZKsGBXTcpdYhripWZnd6lSutz3JTJRsMDcmqobpn0mXHCjQbMW1xWek/tLuAILvLrfbhnsop6OlhntfFm9uuU3JuiM/MoscADKQSkV+ASVTJxfFyD/R7LwEft2WRANGsD8Bzjlmdxxa9vzBQrLLi/81ZLbASDeIwRMhWy5Yib/x4V92SkaE1Jj0JL9BbuZGqjrP2RpluTu6+BAbfoyemxZnkMBgiiCYUqFMcj6KdkSThhPYBNRcHuw6PFqyOcdQrnBGq5gQVbFJos4BbVKJ99nfZETVguK4x6AQ+8ALVBhxUElNaE8q52y8OOKbbzzjU5aGPSxyKEQqNmW/AUNzAW8PhK50s69StNlhcHyYbIMZ2ui3kYMqjXYP5SZmUg4zfTy6IdDek4OrtiAR9hAEzDazaA3gl5HPwzlSGztSXQOPWIaNJIvDOudiu2BFzIc2GbMaOtYPORIM6NRVzkD+dmSC9DhPzacVX3l9Ia8jCQLuytJnWDK30kopJziTlhU2N0OW1CHWVYd5zgdStUcmu4QDAx0IMu0AWtx2KDKPe2huv4wSz1Td+aKNp+pli1aKe/VRjao62AKtFOyReOmYr+C27V8MZrvu0gBXZBCoO9uzqYoAxtlXV72q02T/laEQ+0PzdhmpDckBn4pNzqTWF524h/3X/A+/yNRHQOqHXTgw96CiKmXT847CRbHq4zD+iPKhfuAQMRmXBnM5sMGMmEqzP198GY9eEittdZ4YeyO7pbpx+fe91z1i/RQ7h/rbJXmAYN+1Z3R+BxahvhmKGXFKz4rCbYaRVTq8jRkfgbxqUcltqrCUaoQsrdrdymsFteqnXnRGN2eEdmNTHtzK7VrZaqm6cDPLznY03WeGaJB/cRiY8XHm1UEWY1q0FQ0jrDxZoqoazswHB50AZs27JgFDT90pFynE56Vdvcs4nd778ZSf4J57ZYo/T1gJcM3B+3ZivLCUm3kuRH6NoXzqxfE96KBlmwFFrd3XFSWVIVtlggOFmQDOndEK2iBuDDGPGaljDMgMt46KAfvzSeXoqc7enXFhSoE9Zh9PbHAPHgLzdcihBZRA1HYYp5QKVaYHVfl40S+mYwPuun2tOeaar9VzK6COW8+Xn3VKLNJ9IlXFadnZ+ZtPrjfmIiV5P7LEf/NQ2ffo/mSF9JoZ7itGyqcC4o9lIzPvPJO5Rejmqxo88w/bV55iNjlCFQ05K14nQNd84HlNDhXDozzAfc7pSYi+UNF0//gPnhwvNtfiahQr0KEhX0msvAfuwDjqvLNade9XhgPO/Z6tm9GD03qli5Kdm5wiA9/8JobcCvC5afIQ2UOJIPt1XOtbfjrPkVzDvedKnYBWGDQgcJa1hY+l7qv+Rb+np5TPp+mgsZBibOk10JqRnrFZYVqXN6j7xITAmKiZ4gX5ygNv+bWX5M0DNnUffNuExglW8+WL6utYqR3/EhtvaVeFccKDye8Wxg83pYgdY8DFhCeLflGy0Usdduoj5/exx4+79H+Dp8ir6phXQ/+rGurqFlhdLydTrt1uVwus8ftcv3YLRP+YD0KisoILxQGcP7s7uzA9A9Xo+WtlR/YDAxIn8j7oyFzrd8SIsK8FQssmLG+5XTdNN11LXKJc0c3AtuzA1d3mgvKBiwc4C2mV7lZcPBKp/r0qRXPfxmhHID8iw+aLisPOrJhK/FIg5Pjhxfy4pFL75zjxgPJYbKGmCFpAqdxAKL/ZFun5fD+YYtcVjOSUH0xU91zFT5sTxh8lq65kV4arolaPzooYdpzpyykleP5uI9FXOEbXM7BuEdMfGxu77sTPo61qZ44RsJ0DeunAfXh4Zt4WmLJfUZL8ogBdqAccdCugx/a+gA5U4JMuSYPdvcASUZ8rKIoWmbb8+l62S43TNdQ52SFwuvNRQ/6joX3PK5V9gbxtWg8o+HdiVJPH3QW52x/5+tkSke04NIO7cDQVWW6OOErXWka+yfLCehAB/uQCi9jvjtOt71aJRztObOLeIuqjYOM65LJT097Or8BrMPpUP+XG5eF4eIjF0wL7GHeH8Z3spEm7R82F3JJ21m256j7Sj2LtZxDBkELoXsm5oa50FzV6riqcaa99zp+VYl4GGd4VH48lCgoAE3yi/M+Sr07I7IiUCai5WB5w7fYrt4GlBpxbTrfg7LRzq9TkOMYRhtHOKPgbV7eOQgNdj3DBMgipnG0Y/+NCvoIecYsDH0Fw8+eeh/gEq5+9enMqTHIAMTMVZ5xWfJwUbc5u6ZVwtsMBQag/D7sHaaPv1KOtBmWakqyvNdf8GAyMGh1Hb6HYUYdr5WR0oaVmRyqyBnTug9hF4y4wBFFouDujoxe5ITbRTHFlcjavJdBcOJj26rAtKLScH/d5m7jHZf13SgxmS/QudP9qyXXUvaYNU5kywasJW1uevERX6gyvXBp9C63gP9c9Hqo1oh0fBalYNfP4S1M4u2hXBPGrsuN67CYKS2lnRf4FLAEM7OTP/qYrpqk6u55brmg8yLe3MLAsASyTLmUGiXOmOGHsfoq7n1G6djkSGNf/bk02FrrpoY8ML7xpZrKNL3TivZhC0m/TqU0HSN7PgIjEOm4Gbyh6Oe6aEaAwmI10PCEv6GDNO1s9jFIDYvHfUVNDTZstTvrBW+OkOr9TyR5rCqlpU8oyZI0KiGJtl+wmSEdL2k2dkjtL6hHTO+HZVmWy0u8SXw2bIOlILsLlgw4g+abaCpl8MpFulHeXVay+6/R82MgMP5TRXAqVTOhB34HdnmTnhexURwWVj4RCyP/EtP+JrUfXlm2EjW62GYsgfjy+Zy/mGqrfy06TpAijB0LBYz5hKrvpEpOy2cnb8v+YTL6k8/B/W8kzL6k5m1FVQ3LdPzmhzl/RnykiyTBBl1TnMGPMSZ1D0YszPTnWVWaB2FPrkOOKhmBeNFU8rROS5M5WLt/nMH6ic6lpzb0jeLzxx+shu1iGoUaT+V+LDd24Afeoio3/fXw+mtk9M1I3vw/WEBOviTGf+6igH+cnKIVI76nA/dJ/ghNdLvYLBabwtP/TaD979H/AeCclPIP3o6hAAAAAElFTkSuQmCC";

var default_post_json = {
	name: default_name,
	profile: default_url,
	followers : [{
		name: "1",
		profile: default_url
	}, {
		name: "2",
		profile: default_url
	}, {
		name: "3",
		profile: default_url
	}],
	posts : [{
         		"pid":"pid",                                      // PostID
         		"uid":"uid",                                      // UserID of poster
         		"name":"MyName",                                   // User name of poster
         		"profile":default_url2,                                // Poster profile image URL
         		"timestamp":"YYYY-MM-DD HH:MM:SS",              // When post is posted
         		"image":default_url2,                                  // Post image
         		"content":"ONE+TWO+THREE",                                // Post text content
         		"comments":[                                    // comments json array
         		{
                	  	"uid":"xxx",                              // UserID of commenter
                	  	"name":"xxx",                           // User name of commenter
                	  	"profile":default_url2,                        // Commenter profile image URL
                	  	"timestamp":"YYYY-MM-DD HH:MM:SS",      // When comment is made
                  		"content":"xxx"                         // Comment text content
                  	},
                  	{
                  		"uid":"xxx",                              // UserID of commenter
                  		"name":"xxx",                           // User name of commenter
                  		"profile":default_url2,                        // Commenter profile image URL
                  		"timestamp":"YYYY-MM-DD HH:MM:SS",      // When comment is made
                  		"content":"xxx"                         // Comment text content
                  	}]
                  }, {
         		 "pid":"pid",                                      // PostID
         		 "uid":"uid",                                      // UserID of poster
         		 "name":"MyName",                                   // User name of poster
         		 "profile":default_url2,                                // Poster profile image URL
         		 "timestamp":"YYYY-MM-DD HH:MM:SS",              // When post is posted
         		 "image":default_url2,                                  // Post image
         		 "content":"ONE+TWO+THREE",                                // Post text content
         		 "comments":[                                    // comments json array
         		 {
                  		"uid":"xxx",                              // UserID of commenter
                  		"name":"xxx",                           // User name of commenter
                  		"profile":default_url2,                        // Commenter profile image URL
                  		"timestamp":"YYYY-MM-DD HH:MM:SS",      // When comment is made
                  		"content":"xxx"                         // Comment text content
                  	},
                  	{
                  		"uid":"xxx",                              // UserID of commenter
                  		"name":"xxx",                           // User name of commenter
                  		"profile":default_url2,                        // Commenter profile image URL
                  		"timestamp":"YYYY-MM-DD HH:MM:SS",      // When comment is made
                 		 "content":"xxx"                         // Comment text content
                 		}
                 		]}]
                 	};


var default_recommendation_json = {"recommendation": [{
	name: "1",
      "profile":default_url2                                // Poster profile image URL
  }, {
  	name: "2",
      "profile":default_url2                                // Poster profile image URL
  },{
  	name: "3",
      "profile":default_url2                                // Poster profile image URL
  }, {
  	name: "4",
      "profile":default_url2                                // Poster profile image URL
  },{
  	name: "5",
      "profile":default_url2                                // Poster profile image URL
  }, {
  	name: "6",
      "profile":default_url2                                // Poster profile image URL
  },{
  	name: "7",
      "profile":default_url2                                // Poster profile image URL
  }, {
  	name: "8",
      "profile":default_url2                                // Poster profile image URL
  },{
  	name: "9",
      "profile":default_url2                                // Poster profile image URL
  }, {
  	name: "10",
      "profile":default_url2                                // Poster profile image URL
}]};

router.get('/heartbeat', function(req, res) {
	res.json({
		url: default_url
	});
});

router.get('/task1', function(req, res) {
	if (req.query.id === undefined || 
		req.query.password === undefined) {
		res.json({
			name: default_name,
			profile: default_url
		});
	} else {
		proxy.task1(req.query.id, req.query.password, function(resp) {
			try {
        console.log(resp);
        obj = JSON.parse(resp);
				res.json(obj);
			} catch (se) {
				res.json({
					name: se.message
				})
			}
		});
	}
});


router.get('/task2', function(req, res) {
  console.log("GET Task2");
	if (req.query.id === undefined) {
		res.json({
			name: default_name,
			profile: default_url,
			followers : [{
				name: "1",
				profile: default_url
			}, {
				name: "2",
				profile: default_url
			}, {
				name: "3",
				profile: default_url
			}]
		});
	} else {
		proxy.task2(req.query.id, function(resp) {
			try {
        console.log(resp);
				res.json(JSON.parse(resp));
			} catch (se) {
				res.json({
					name: se.message
				})
			}
		});
	}
});


router.get('/task3', function(req, res) {
  console.log("GET Task3");
	if (req.query.id === undefined) {
		res.json(default_post_json);
	} else {
		proxy.task3(req.query.id, function(resp) {
			try {
				res.json(JSON.parse(resp));
			} catch (se) {
				res.json({
					name: se.message
				});
			}
		});
	}
});


router.get('/task4', function(req, res) {
  console.log("GET Task4");
	if (req.query.id === undefined) {
		res.json(default_post_json);
	} else {
		proxy.task4(req.query.id, function(resp) {
			try {
        // console.log(JSON.parse(resp));
				res.json(JSON.parse(resp));
			} catch (se) {
				res.json({
					name: se.message
				})
			}
		});
	}
});


router.get('/task5', function(req, res) {
  console.log("GET Task5");
	if (req.query.id === undefined) {
		res.json(default_recommendation_json);
	} else {
		proxy.task5(req.query.id, function(resp) {
			try {
				res.json(JSON.parse(resp));
			} catch (se) {
				res.json({
					name: se.message
				})
			}
		});
	}
});


module.exports = router;

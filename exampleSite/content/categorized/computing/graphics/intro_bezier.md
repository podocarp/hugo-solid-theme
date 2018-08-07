+++ 
date = 2018-07-03T12:37:27+08:00
type = "blog"
title = "Bezier Curves"
summary = "Some latex"
tags = ["bezier", "computing", "graphics"]
categories = [ "computing", "graphics" ]
showLatex = true
+++

# Introduction
Some latex
Just enable showLatex = true in your front matter.

# The curve

\begin{equation}
   C(t) = \sum_{i=0}^n {n \choose i} (1-t)^{n-i} (t^i)P_i
\end{equation}

\\( n \\) is the degree, \\(t \\) is a "timestep", \\(P\\) are control points, and of course \\(C\\) is our curve.
Let us discuss how to get here:

# Cubic
The cubic function is then just a linear interpolation between two quadratic functions.
Here is how the points are selected and interpolated:

\begin{equation}
C(t,P_0,P_1,P_2,P_3) = (1-t)B(t,P_0,P_1,P_2) = tB(t,P_1,P_2,P_3)
\end{equation}

This can be extended further to any degree you want.

## Binomial form
Those are the binomial coefficients. We can reduce the functions to:
\begin{equation}
   C(t) = \sum_{i=0}^n {n \choose i} (1-t)^{n-i} (t^i)P_i
\end{equation}

sort of like a binomial expansion. Proof that this is correct is left as an exercise to the reader[^1].

For the rest of this post let us use this for convenience:
\begin{align}
   B\_{n,i}(t) &= {n \choose i} (1-t)^{n-i} (t^i) \newline
   &= \frac{n!}{i!(n-i)!} (1-t)^{n-i} (t^i)\nonumber
\end{align}

Such that we can simply write

\begin{equation}
C(t) = \sum_{i=0}^n B\_{n,i}(t)t^iP_i
\end{equation}

## Changing degrees

If we instead do a recursion without changing the arguments, we return to itself:

\begin{equation}
(1-t)C(t,P_0,P_1,\ldots,P_n) + tC(t,P_0,P_1,\ldots,P_n) = C(t,P_0,P_1,\ldots,P_n)
\end{equation}


\begin{align}
(1-t)C(t) + tC(t) &= \sum\_{i=0}^n {n \choose i} (1-t)^{n+1-i} t^iP_i + \sum\_{i=0}^n {n \choose i} (1-t)^{n+1-(i+1)} t^{i+1}P_i \newline \nonumber
&= \sum\_{i=0}^n \frac{n+1-i}{n+1}{n+1 \choose i} (1-t)^{n+1-i} t^iP_i + \sum\_{i=0}^n \frac{i+1}{n+1}{n+1 \choose i+1} (1-t)^{n+1-(i+1)} t^{i+1}P_i \newline \nonumber
&= \sum\_{i=0}^n \frac{n+1-i}{n+1}B\_{n+1,i}(t)P_i + \sum\_{i=0}^n \frac{i+1}{n+1}B\_{n+1,i+1}(t)P_i \newline \nonumber
&= \sum\_{i=0}^{n+1} \frac{n+1-i}{n+1}B\_{n+1,i}(t)P_i + \sum\_{i=1}^{n+1} \frac{i}{n+1}B\_{n+1,i}(t)P\_{i-1} \newline \nonumber
&= \sum\_{i=0}^{n+1} \Big(\frac{n+1-i}{n+1}P_i + \frac{i}{n+1}P\_{i-1}\Big) B\_{n+1,i}(t) \newline \nonumber
&= \sum\_{i=0}^{n+1} P^\prime_i B\_{n+1,i}(t)  \nonumber
\end{align}


# Derivatives

\begin{align}
   \frac{d}{dt}B\_{n,i}(t) &= \frac{n!}{i(n-i)!} \frac{d}{dt}[(1-t)^{n-i} (t^i)] \newline \nonumber
   &= \frac{n!}{i!(n-i)!}[(i-t)^{n-i}\frac{d}{dt}t^i + t^i\frac{d}{dt}(1-t)^{n-i}] \newline \nonumber
   &= \frac{n!}{i!(n-i)!} [(i-t)^{n-i}it^{i-1} - t^i(n-i)(1-t)^{n-i-1}] \newline \nonumber
   &= \frac{n(n-1)!}{(i-1)!(n-1-(i-1))!}t^{i-1}(1-t)^{n-i} - \frac{n(n-1)!}{i(n-1-i)!}t^i(i-t)^{n-1-i} \newline \nonumber
   &= n(B\_{n-1,i-1}(t) - B\_{n-1,i}(t))
\end{align}

We would be done here, but this can be further simplified if we expand the summation and remove the useless terms:

\begin{align}
\frac{d}{dt}C(t) &= \sum_{i=0}^n P_i n (B\_{n-1,i-1}(t)-B\_{n-1,i}(t)) \newline \nonumber
&= n[P_0(B\_{n-1,-1}(t)-B\_{n-1,0}(t) \newline \nonumber
&+ P_1(B\_{n-1,0}(t)-B\_{n-1,1}(t) \newline \nonumber
&+ \ldots \newline \nonumber
&+ P_n(B\_{n-1,n-1}(t)-B\_{n-1,n}(t))] \newline \nonumber
&= n[P_1B\_{n-1,0}(t) - P_0B\_{n-1,0}(t)  \newline \nonumber
&+ \ldots \newline \nonumber
&+ P_nB\_{n-1,n-1} - P\_{n-1}B\_{n-1,n-1}] \newline \nonumber
&= \sum\_{i=0}^{n-1} (P\_{i+1} - P_i)B\_{n-1,i}
\end{align}


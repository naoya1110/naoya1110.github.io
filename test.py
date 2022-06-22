import cv2
img = cv2.imread("imgs/IMGP1694.JPG")
print(img.shape)
h, w, _ = img.shape
img = cv2.resize(img, (int(w/4), int(h/4)))
cv2.imwrite("imgs/IMGP1694_small.JPG", img)

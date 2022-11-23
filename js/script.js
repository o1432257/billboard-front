let selectedRow = null
let tbody = document.querySelector('tbody')
let form = document.querySelector('form')
let url = 'http://127.0.0.1:8000/api'

// 畫面先渲染一次
render()

// 新增或更新
form.addEventListener('submit', async function (e) {

    e.preventDefault()
    let result = serialize(form, { hash: true })
    let res = null

    if (selectedRow == null) {
        // 新增
        res = await http({
            method: 'post',
            url: url + '/billboard',
            data: result
        })
    } else {
        // 更新
        res = await http({
            method: 'put',
            url: url + '/billboard/' + selectedRow.cells[0].innerHTML,
            data: result
        })

        selectedRow = null
        document.getElementById("card-header").innerHTML = 'Add New Billboard'
    }

    if (res.status === 201 || res.status === 200) {
        render()
        form.reset()
    } else {
        alert(res.message)
    }

})

tbody.addEventListener('click', async function (e) {
    // 刪除
    if (e.target.dataset.type === 'delete') {
        let res = await http({
            method: 'delete',
            url: url + '/billboard/' + e.target.dataset.id
        })

        if (res.status === 200) {
            render()
        }
    }

    // 導向更新
    if (e.target.dataset.type === 'edit') {
        selectedRow = e.target.parentElement.parentElement;

        document.getElementById("title").value = selectedRow.cells[1].innerHTML;
        document.getElementById("content").value = selectedRow.cells[2].
            innerHTML;

        document.getElementById("card-header").innerHTML = 'Update New Billboard'
    }

})

// 渲染
async function render() {
    let res = await http({
        method: 'get',
        url: url + '/billboard'
    })

    let htmlStr = ''

    res.data.forEach(item => {
        htmlStr += `
      <tr>
        <th scope="row">${item.id}</th>
        <td>${item.title}</td>
        <td>${item.content}</td>
        <td>
          <button type="button" class="btn btn-warning btn-sm" data-id="${item.id}" data-type="edit">
            edit
          </button>
          <button type="button" class="btn btn-danger btn-sm" data-id="${item.id}" data-type="delete">
            delete
          </button>
        </td>
      </tr>
    `
    })

    tbody.innerHTML = htmlStr
}
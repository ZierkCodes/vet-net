let input = document.querySelector('#selected-option')
let chevron = document.querySelector('#icon')
let branch = document.querySelector('#branch')

document.querySelector('.custom-select-wrapper').addEventListener('click', function() {
    this.querySelector('.custom-select').classList.toggle('open');
    
})

for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function() {
        if(chevron.className === 'fas fa-chevron-up') {
            chevron.className = 'fas fa-chevron-down'
        } else {
            chevron.className = 'fas fa-chevron-up'
        }
        if (!this.classList.contains('selected')) {
            if(document.querySelector('.custom-option.selected')) {
                this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            }
            
            this.classList.add('selected');
            input.textContent = this.textContent
            branch.value = this.dataset.branch
            console.log(branch.value)
            input.classList.add('filled')
            chevron.className = 'fas fa-chevron-down'

            
        }
    })
}

window.addEventListener('click', function(e) {
    
    const select = document.querySelector('.custom-select')
    console.log(e.target)
    if(e.target.className === 'custom-select__trigger' || select.classList.contains('open')) {
        if(chevron.className === 'fas fa-chevron-up') {
            chevron.className = 'fas fa-chevron-down'
        } else {
            chevron.className = 'fas fa-chevron-up'
        }
    }
    if (!select.contains(e.target)) {
        select.classList.remove('open');
        
    }
});
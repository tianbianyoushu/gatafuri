document.addEventListener('DOMContentLoaded', () => {
    fetch('members.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(members => {
            const memberGrid = document.querySelector('.member-grid');
            if (!memberGrid) return;

            // コンテンツをクリア
            memberGrid.innerHTML = '';

            // メンバーカードを作成して追加
            members.forEach(member => {
                const memberItem = document.createElement('div');
                memberItem.classList.add('member-item');
                memberItem.innerHTML = `
                    <img src="${member.iconUrl}" alt="${member.name}のアイコン" class="member-icon">
                    <div class="member-info">
                        <h4 class="member-name">${member.name}</h4>
                        <h5 class="member-title">${member.title}</h5>
                        <p class="member-bio">${member.bio}</p>
                    </div>
                `;
                memberGrid.appendChild(memberItem);
            });

            // 無限ループのためにコンテンツを複製
            if (members.length > 0) {
                const memberItems = memberGrid.querySelectorAll('.member-item');
                memberItems.forEach(item => {
                    const clone = item.cloneNode(true);
                    memberGrid.appendChild(clone);
                });
            }
        })
        .catch(error => console.error('Error loading members:', error));
});
